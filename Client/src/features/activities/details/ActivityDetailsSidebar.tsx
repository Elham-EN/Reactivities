import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

const attendees = [
  { name: "Bob", initial: "B", isHost: true },
  { name: "Tom", initial: "T", isHost: false },
  { name: "Sarah", initial: "S", isHost: false },
];

function ActivityDetailsSidebar(): React.ReactElement {
  return (
    <Card
      elevation={0}
      sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}
        >
          {attendees.length} people going
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {attendees.map((attendee) => (
            <Box
              key={attendee.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "primary.main",
                    fontWeight: 700,
                  }}
                >
                  {attendee.initial}
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {attendee.name}
                </Typography>
              </Box>
              {attendee.isHost && (
                <Chip
                  label="Host"
                  size="small"
                  sx={{
                    bgcolor: "primary.main",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    height: 20,
                    borderRadius: 1,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ActivityDetailsSidebar;
