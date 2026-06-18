import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import type { Activitiy } from "../../../lib/types/index.type";
import { useActivities, useActivity } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
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

  const { reset, handleSubmit, control } = useForm<ActivitySchema>({
    resolver: zodResolver(activitySchema),
    mode: "all", // runs validation on both onChange and onBlur
    defaultValues: activityDefaultValues,
  });

  const { updateActivity, createActivity } = useActivities();

  React.useEffect(() => {
    // essentially pre-filling the edit form with the existing activity's data.
    if (activity) reset(activity);
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
        <TextInput<ActivitySchema> label="City" name="city" control={control} />
        <TextInput<ActivitySchema>
          label="Venue"
          name="venue"
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
  );
}
