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
    title: "Discover Raves",
    description:
      "Browse underground raves, warehouse parties, and festivals from the world's best DJs and collectives, near you and beyond.",
  },
  {
    icon: <GroupOutlinedIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Join the Scene",
    description:
      "Connect with fellow ravers, see who's going, and link up with the community before you even step on the dancefloor.",
  },
  {
    icon: (
      <AddCircleOutlineOutlinedIcon
        sx={{ fontSize: 40, color: "primary.main" }}
      />
    ),
    title: "Host Your Own",
    description:
      "Throwing a set or running a night? List your event, manage the lineup, and get ravers through the door.",
  },
];

export default function HomePage(): React.ReactElement {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          backgroundImage: "url(/images/homeImage.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <Box sx={{ position: "relative", maxWidth: 640 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              letterSpacing: "-1px",
              color: "#fff",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Find your next{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              rave
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontWeight: 400,
              mb: 4,
              lineHeight: 1.7,
              fontSize: { xs: "1rem", md: "1.15rem" },
            }}
          >
            Reactivities helps you discover underground raves, warehouse
            parties, and festivals, then connect with the people who'll be
            there with you.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              component={NavLink}
              to="/activities"
              variant="contained"
              size="large"
              disableElevation
              sx={{
                borderRadius: 5,
                textTransform: "none",
                fontWeight: 700,
                px: 4,
              }}
            >
              Browse Raves
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 5,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                borderColor: "rgba(255,255,255,0.6)",
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ pt: 10, pb: 10 }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: 5,
            color: "text.primary",
          }}
        >
          Everything you need to find your next night out
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
                    sx={{
                      fontWeight: 700,
                      mt: 2,
                      mb: 1,
                      color: "text.primary",
                    }}
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
          Ready to ride the bass?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}
        >
          Join thousands of ravers discovering their next event every day.
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

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: "center",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Reactivities. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
