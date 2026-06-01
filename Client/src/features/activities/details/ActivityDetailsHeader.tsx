import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { format } from "date-fns";
import type { Activitiy } from "../../../lib/types/index.type";

interface Props {
  activity: Activitiy;
}

const isHost = true;

function ActivityDetailsHeader({ activity }: Props): React.ReactElement {
  return (
    <Card
      elevation={0}
      sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid", borderColor: "divider" }}
    >
      {/* Hero image */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={`/images/categoryImages/${activity.category}.jpg`}
          alt={activity.category}
          sx={{ width: "100%", height: 250, objectFit: "cover", display: "block" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
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
          <Box>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 800, lineHeight: 1.2, mb: 0.5 }}>
              {activity.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)" }}>
              {format(new Date(activity.date), "EEEE, MMMM d, yyyy 'at' h:mm a")}
            </Typography>
          </Box>
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

      {/* Host info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2.5, py: 2 }}>
        <Avatar
          sx={{ width: 44, height: 44, bgcolor: "primary.main", fontWeight: 700 }}
        >
          B
        </Avatar>
        <Box>
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
          {isHost && (
            <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 600 }}>
              You are hosting this activity
            </Typography>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Action buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.5,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {isHost ? (
            <>
              <Button
                component={Link}
                to={`/activities/edit/${activity.id}`}
                variant="contained"
                disableElevation
                sx={{ borderRadius: 5, textTransform: "none", fontWeight: 700, px: 3 }}
              >
                Manage Event
              </Button>
              <Button
                variant="outlined"
                color="error"
                disableElevation
                sx={{ borderRadius: 5, textTransform: "none", fontWeight: 600, px: 3 }}
              >
                Cancel Activity
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              disableElevation
              sx={{ borderRadius: 5, textTransform: "none", fontWeight: 700, px: 3 }}
            >
              Join Activity
            </Button>
          )}
        </Box>
        <Button
          component={Link}
          to="/activities"
          variant="text"
          sx={{
            borderRadius: 5,
            textTransform: "none",
            fontWeight: 600,
            color: "text.secondary",
            "&:hover": { color: "text.primary", bgcolor: "secondary.main" },
          }}
        >
          Back to Activities
        </Button>
      </Box>
    </Card>
  );
}

export default ActivityDetailsHeader;
