import React from "react";
import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function NotFound(): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        px: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          p: 5,
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            bgcolor: "secondary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <SearchOffIcon sx={{ fontSize: 36, color: "text.secondary" }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}>
          Page Not Found
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          The page you're looking for doesn't exist or may have been removed.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Button
          component={Link}
          to="/activities"
          variant="contained"
          disableElevation
          sx={{
            borderRadius: 5,
            textTransform: "none",
            fontWeight: 700,
            px: 4,
          }}
        >
          Back to Activities
        </Button>
      </Card>
    </Box>
  );
}
