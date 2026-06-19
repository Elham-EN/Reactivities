import { Box, Button, Paper, Typography } from "@mui/material";
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
  const { reset, handleSubmit, control } = methods;

  const { updateActivity, createActivity } = useActivities();

  React.useEffect(() => {
    if (activity) reset(activity);
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    console.log(data);
    // if (activity) {
    //   navigate(`/activities/${activity.id}`);
    // } else {
    //   data.latitude = "0";
    //   data.longitude = "0";
    //   data.date = new Date(data.date as string).toISOString();
    //   const id = await createActivity.mutateAsync(data as unknown as Activitiy);
    //   toast.success("Activity created successfully!");
    //   navigate(`/activities/${id}`);
    // }
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
