import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import type { Activitiy } from "../../../lib/types/index.type";
import { useActivities, useActivity } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useForm, type FieldValues } from "react-hook-form";

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

  const { register, reset, handleSubmit } = useForm<Activitiy>();

  const { updateActivity, createActivity } = useActivities();

  React.useEffect(() => {
    // essentially pre-filling the edit form with the existing activity's data.
    if (activity) reset(activity);
  }, [activity, reset]);

  const onSubmit = async (data: FieldValues) => {
    if (activity) {
      data.id = activity.id;
      data.latitude = String(activity.latitude);
      data.longitude = String(activity.longitude);
      data.date = new Date(data.date as string).toISOString();
      await updateActivity.mutateAsync(data as unknown as Activitiy);
      navigate(`/activities/${activity.id}`);
    } else {
      data.latitude = "0";
      data.longitude = "0";
      data.date = new Date(data.date as string).toISOString();
      const id = await createActivity.mutateAsync(data as unknown as Activitiy);
      toast.success("Activity created successfully!");
      navigate(`/activities/${id}`);
    }
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
        <TextField
          {...register("date")}
          label="Date & Time"
          type="datetime-local"
          defaultValue={
            activity?.date
              ? format(new Date(activity.date), "yyyy-MM-dd'T'HH:mm")
              : format(new Date(), "yyyy-MM-dd'T'HH:mm")
          }
          slotProps={{ inputLabel: { shrink: true } }}
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
