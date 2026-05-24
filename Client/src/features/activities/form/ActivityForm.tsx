import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import type { Activitiy } from "../../../lib/types/index.type";

interface Props {
  activity?: Activitiy;
  closeForm: () => void;
}

export default function ActivityForm({
  activity,
  closeForm,
}: Props): React.ReactElement {
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }} elevation={0}>
      <Typography variant="h5" gutterBottom color="primary">
        Create activity
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField label="Title" value={activity?.title} />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={activity?.description}
        />
        <TextField label="Category" value={activity?.category} />
        <TextField type="date" value={activity?.date} />
        <TextField label="City" value={activity?.city} />
        <TextField label="Venue" value={activity?.venue} />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={closeForm} color="inherit">
            Cancel
          </Button>
          <Button variant="contained">Submit</Button>
        </Box>
      </Box>
    </Paper>
  );
}
