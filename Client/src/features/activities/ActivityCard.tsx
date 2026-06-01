import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Stack,
  CardHeader,
  Avatar,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import type { Activitiy } from "../../lib/types/index.type";
import { Link } from "react-router";
import { format } from "date-fns";

interface Props {
  activity: Activitiy;
}

function ActivityCard({ activity }: Props): React.ReactElement {
  const isHost = true;
  const isGoing = false;
  const isCancelled = true;
  const label = isHost ? "You are hosting" : isGoing ? "You are going" : "";
  const color = isHost
    ? "primary.main"
    : isGoing
      ? "success.main"
      : "text.secondary";

  const formattedDate = format(new Date(activity.date), "EEEE, MMMM d, yyyy 'at' h:mm a");

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
        transition: "box-shadow 0.2s, border-color 0.2s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 0 0 1px var(--mui-palette-primary-main)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: 52,
              height: 52,
              bgcolor: "primary.main",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            B
          </Avatar>
        }
        title={
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.05rem",
              color: "text.primary",
              lineHeight: 1.3,
            }}
          >
            {activity.title}
          </Typography>
        }
        subheader={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Hosted by{" "}
              <Box
                component={Link}
                to="/profiles/bob"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Bob
              </Box>
            </Typography>
            {(isHost || isGoing) && (
              <Chip
                label={label}
                size="small"
                sx={{
                  bgcolor: color,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.6rem",
                  height: 18,
                  borderRadius: 1,
                }}
              />
            )}
          </Box>
        }
        action={
          <Stack direction="row" spacing={0.5} sx={{ pt: 1, pr: 1 }}>
            <Chip
              label={activity.category.toUpperCase()}
              size="small"
              sx={{
                bgcolor: "secondary.main",
                color: "secondary.contrastText",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.06em",
                height: 20,
                borderRadius: 1,
              }}
            />
            {isCancelled && (
              <Chip
                label="CANCELLED"
                size="small"
                sx={{
                  bgcolor: "error.main",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.6rem",
                  height: 20,
                  borderRadius: 1,
                }}
              />
            )}
          </Stack>
        }
        sx={{ px: 3, pt: 2.5, pb: 1 }}
      />
      <CardContent sx={{ p: 3, pb: 2 }}>
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

      <CardActions sx={{ px: 3, py: 2.5, gap: 1, justifyContent: "flex-end" }}>
        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          size="small"
          variant="contained"
          disableElevation
          sx={{
            borderRadius: 5,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.85rem",
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default ActivityCard;
