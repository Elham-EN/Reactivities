import React from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { Activitiy } from "../../../lib/types/index.type";
import { format } from "date-fns";

interface Props {
  activity: Activitiy;
}

function ActivityDetailsInfo({ activity }: Props): React.ReactElement {
  const formattedDate = format(new Date(activity.date), "EEEE, MMMM d, yyyy 'at' h:mm a");

  return (
    <Card
      elevation={0}
      sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <CalendarTodayOutlinedIcon
            sx={{ fontSize: 18, color: "primary.main", flexShrink: 0 }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {formattedDate}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}
        >
          <LocationOnOutlinedIcon
            sx={{
              fontSize: 18,
              color: "primary.main",
              flexShrink: 0,
              mt: "2px",
            }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {activity.venue},{" "}
            <Box
              component="span"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {activity.city}
            </Box>
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
          <InfoOutlinedIcon
            sx={{
              fontSize: 18,
              color: "primary.main",
              flexShrink: 0,
              mt: "2px",
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", lineHeight: 1.7 }}
          >
            {activity.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ActivityDetailsInfo;
