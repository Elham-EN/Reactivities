import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import type { Activitiy } from "../../../lib/types/index.type";
import { useActivities, useActivity } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import {
  activityDefaultValues,
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../lib/components/TextInput";
import SelectInput from "../../../lib/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../lib/components/DateTimeInput";
import LocationInput from "../../../lib/components/LocationInput";
import { toast } from "react-toastify";

interface Props {
  activity?: Activitiy;
}

export function EditActivityForm(): React.ReactElement {
  const { id } = useParams();
  const { activity } = useActivity(id!);
  return <ActivityForm activity={activity} />;
}

export default function ActivityForm({ activity }: Props): React.ReactElement {
  const navigate = useNavigate();

  const methods = useForm<ActivitySchema>({
    resolver: zodResolver(activitySchema),
    mode: "all",
    defaultValues: activityDefaultValues,
  });
  const {
    reset,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = methods;

  const { updateActivity, createActivity } = useActivities();

  React.useEffect(() => {
    if (activity)
      // Put activity coming from the server in the shape our form schema expected
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
  }, [activity, reset]);

  // Flatten ActivitySchema data into Activity Shape to send to the server
  const onSubmit = (data: ActivitySchema): void => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest, ...location } as Activitiy;
    try {
      if (activity) {
        updateActivity.mutate(
          { ...activity, ...flattenedData },
          {
            onSuccess: () => {
              toast.success("Activitiy Updated");
              navigate(`/activities/${activity.id}`);
            },
            onError: (error) => {
              if (Array.isArray(error)) {
                setError("root.serverError", { message: error.join(", ") });
              }
            },
          },
        );
      } else {
        createActivity.mutate(flattenedData, {
          onSuccess: (id: string) => {
            toast.success("Activitiy created successfully");
            navigate(`/activities/${id}`);
          },
          onError: (error) => {
            if (Array.isArray(error)) {
              setError("root.serverError", { message: error.join(", ") });
            }
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Paper sx={{ borderRadius: 3, padding: 3 }} elevation={0}>
        <Typography variant="h5" gutterBottom color="primary">
          Create activity
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextInput<ActivitySchema>
            label="Title"
            name="title"
            control={control}
          />
          <TextInput<ActivitySchema>
            label="Description"
            name="description"
            multiline
            rows={3}
            control={control}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
            }}
          >
            <SelectInput
              items={categoryOptions}
              label="Category"
              name="category"
              control={control}
            />
            <DateTimeInput<ActivitySchema>
              label="Date"
              name="date"
              control={control}
            />
          </Box>
          {errors.root?.serverError && (
            <Alert severity="error">{errors.root.serverError.message}</Alert>
          )}
          <LocationInput<ActivitySchema>
            label="Enter location"
            name="location.venue"
            control={control}
          />
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={() => {}} color="inherit">
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              loading={updateActivity.isPending || createActivity.isPending}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
}
