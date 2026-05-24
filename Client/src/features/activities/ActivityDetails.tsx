import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Divider,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { Activitiy } from "../../lib/types/index.type";

interface Props {
  activity: Activitiy;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

export default function ActivityDetails({
  activity,
  cancelSelectActivity,
  openForm,
}: Props): React.ReactElement {
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
        overflow: "hidden",
      }}
    >
      {/* Hero image with category overlay */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height={220}
          image={`/images/categoryImages/${activity.category}.jpg`}
          alt={activity.category}
          sx={{ objectFit: "cover" }}
        />
        {/* Dark gradient so text is readable over any image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#fff", fontWeight: 800, lineHeight: 1.2 }}
          >
            {activity.title}
          </Typography>
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
                borderRadius: 1,
              }}
            />
          )}
        </Box>
      </Box>

      <CardContent sx={{ p: 3, pb: 2 }}>
        {/* Meta row */}
        <Stack spacing={1.5} sx={{ mb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <CalendarTodayOutlinedIcon
              sx={{ fontSize: 16, color: "primary.main", flexShrink: 0 }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {formattedDate}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
            <LocationOnOutlinedIcon
              sx={{
                fontSize: 16,
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
        </Stack>

        <Divider sx={{ mb: 2.5 }} />

        {/* Description */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
          <InfoOutlinedIcon
            sx={{
              fontSize: 16,
              color: "primary.main",
              flexShrink: 0,
              mt: "3px",
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

      <Divider />

      <CardActions sx={{ px: 3, py: 1.5, gap: 1 }}>
        <Button
          variant="contained"
          disableElevation
          sx={{
            borderRadius: 5,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.85rem",
            px: 2.5,
          }}
          onClick={() => openForm(activity.id)}
        >
          Edit
        </Button>
        <Button
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
          onClick={cancelSelectActivity}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
