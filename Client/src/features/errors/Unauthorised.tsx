import React from "react";
import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Unauthorised(): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "60vh",
        px: 2,
        pt: 6,
      }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          p: 5,
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "warning.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 28, color: "#fff" }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
              Sign in required
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You need to be logged in to view this page
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/account/login"
            variant="contained"
            disableElevation
            sx={{
              borderRadius: 5,
              textTransform: "none",
              fontWeight: 700,
              px: 4,
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/activities"
            variant="outlined"
            sx={{
              borderRadius: 5,
              textTransform: "none",
              fontWeight: 600,
              px: 4,
            }}
          >
            Back to Activities
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
