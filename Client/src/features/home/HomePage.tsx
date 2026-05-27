import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import React from "react";
import { NavLink } from "react-router";

const features = [
  {
    icon: <ExploreOutlinedIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Discover Activities",
    description:
      "Browse hundreds of local and global activities across music, travel, food, sports and more.",
  },
  {
    icon: <GroupOutlinedIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Join the Community",
    description:
      "Connect with like-minded people, join activities, and build meaningful experiences together.",
  },
  {
    icon: (
      <AddCircleOutlineOutlinedIcon
        sx={{ fontSize: 40, color: "primary.main" }}
      />
    ),
    title: "Create & Host",
    description:
      "Organise your own events, invite others, and manage everything from one place.",
  },
];

export default function HomePage(): React.ReactElement {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box sx={{ maxWidth: 640 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              letterSpacing: "-1px",
              color: "text.primary",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Find your next{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              experience
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
              mb: 4,
              lineHeight: 1.7,
              fontSize: { xs: "1rem", md: "1.15rem" },
            }}
          >
            Reactivities helps you discover, join, and create real-world
            activities with people who share your passions.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              component={NavLink}
              to="/activities"
              variant="contained"
              size="large"
              disableElevation
              sx={{ borderRadius: 5, textTransform: "none", fontWeight: 700, px: 4 }}
            >
              Browse Activities
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 5,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                borderColor: "divider",
                color: "text.secondary",
                "&:hover": { borderColor: "primary.main", color: "primary.main" },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: 5,
            color: "text.primary",
          }}
        >
          Everything you need to stay active
        </Typography>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, sm: 4 }} key={feature.title}>
              <Card
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 4,
                  p: 1,
                  height: "100%",
                  transition: "border-color 0.2s",
                  "&:hover": { borderColor: "primary.main" },
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  {feature.icon}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mt: 2, mb: 1, color: "text.primary" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.7 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Banner */}
      <Box
        sx={{
          bgcolor: "primary.main",
          py: 8,
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            color: "#fff",
            mb: 1.5,
          }}
        >
          Ready to get started?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}
        >
          Join thousands of people discovering activities every day.
        </Typography>
        <Button
          variant="contained"
          size="large"
          disableElevation
          sx={{
            borderRadius: 5,
            textTransform: "none",
            fontWeight: 700,
            px: 5,
            bgcolor: "#fff",
            color: "primary.main",
            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
          }}
        >
          Sign Up Free
        </Button>
      </Box>
    </Box>
  );
}
