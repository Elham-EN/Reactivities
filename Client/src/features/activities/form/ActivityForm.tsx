import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export default function ActivityForm(): React.ReactElement {
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }} elevation={0}>
      <Typography variant="h5" gutterBottom color="primary">
        Create activity
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField label="Title" />
        <TextField label="Description" multiline rows={3} />
        <TextField label="Category" />
        <TextField type="date" />
        <TextField label="City" />
        <TextField label="Venue" />
        <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
          <Button color="inherit">Cancel</Button>
          <Button variant="contained">Submit</Button>
        </Box>
      </Box>
    </Paper>
  );
}
