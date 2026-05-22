import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import type { Activitiy } from "../../lib/types/index.type";

interface Props {
  activity: Activitiy;
}

function ActivityCard({ activity }: Props): React.ReactElement {
  const formattedDate = new Date(activity.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 4,
        bgcolor: "background.paper",
        transition: "box-shadow 0.2s, border-color 0.2s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 0 0 1px #1D9BF0",
        },
      }}
    >
      <CardContent sx={{ p: 3, pb: 2 }}>
        {/* Top row: category + cancelled badge */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={activity.category.toUpperCase()}
            size="small"
            sx={{
              bgcolor: "secondary.main",
              color: "text.secondary",
              fontWeight: 700,
              fontSize: "0.65rem",
              letterSpacing: "0.06em",
              height: 22,
              borderRadius: 1,
            }}
          />
          {activity.isCancelled && (
            <Chip
              label="CANCELLED"
              size="small"
              sx={{
                bgcolor: "error.main",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
                height: 22,
                borderRadius: 1,
              }}
            />
          )}
        </Stack>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            fontSize: "1.05rem",
            lineHeight: 1.35,
            mb: 0.75,
          }}
        >
          {activity.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 2.5,
          }}
        >
          {activity.description}
        </Typography>

        {/* Meta: date + location */}
        <Stack spacing={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarTodayOutlinedIcon
              sx={{ fontSize: 15, color: "primary.main", flexShrink: 0 }}
            />
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: "0.82rem" }}
            >
              {formattedDate}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <LocationOnOutlinedIcon
              sx={{
                fontSize: 15,
                color: "primary.main",
                flexShrink: 0,
                mt: "2px",
              }}
            />
            <Typography
              variant="body2"
              noWrap
              sx={{ color: "text.secondary", fontSize: "0.82rem" }}
            >
              {activity.venue}, {activity.city}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={{ px: 3, py: 1.5, gap: 1, justifyContent: "flex-end" }}>
        <Button
          size="small"
          variant="text"
          sx={{
            borderRadius: 5,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "text.secondary",
            px: 1.5,
            "&:hover": { color: "text.primary", bgcolor: "secondary.main" },
          }}
        >
          View
        </Button>
        <Button
          size="small"
          variant="contained"
          disableElevation
          sx={{
            borderRadius: 5,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.85rem",
            px: 2.5,
          }}
        >
          Join
        </Button>
      </CardActions>
    </Card>
  );
}

export default ActivityCard;
