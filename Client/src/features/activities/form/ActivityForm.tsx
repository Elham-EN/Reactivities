import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import type { Activitiy } from "../../../lib/types/index.type";
import { useActivities, useActivity } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { format } from "date-fns";

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
  const { updateActivity, createActivity } = useActivities();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    const formData = new FormData(formElement);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

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
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          defaultValue={activity?.description}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          label="Date & Time"
          type="datetime-local"
          defaultValue={
            activity?.date
              ? format(new Date(activity.date), "yyyy-MM-dd'T'HH:mm")
              : format(new Date(), "yyyy-MM-dd'T'HH:mm")
          }
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
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
