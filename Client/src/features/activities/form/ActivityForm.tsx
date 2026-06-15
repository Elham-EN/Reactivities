import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React from "react";
import type { Activitiy } from "../../../lib/types/index.type";
import { useActivities, useActivity } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ActivitySchema>({
    resolver: zodResolver(activitySchema),
    mode: "onTouched",
  });

  const { updateActivity, createActivity } = useActivities();

  React.useEffect(() => {
    // essentially pre-filling the edit form with the existing activity's data.
    if (activity) reset({ ...activity, date: new Date(activity.date) });
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
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
    <Paper sx={{ borderRadius: 3, padding: 3 }} elevation={0}>
      <Typography variant="h5" gutterBottom color="primary">
        Create activity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          {...register("title")}
          label="Title"
          defaultValue={activity?.title}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
        />
        <TextField
          {...register("description")}
          label="Description"
          multiline
          rows={3}
          defaultValue={activity?.description}
        />
        <TextField
          {...register("category")}
          label="Category"
          defaultValue={activity?.category}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              label="Date & Time"
              value={field.value ?? null}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  onBlur: field.onBlur,
                  error: Boolean(errors.date),
                  helperText: errors.date?.message,
                },
              }}
            />
          )}
        />
        <TextField
          {...register("city")}
          label="City"
          defaultValue={activity?.city}
        />
        <TextField
          {...register("venue")}
          label="Venue"
          defaultValue={activity?.venue}
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
  );
}
