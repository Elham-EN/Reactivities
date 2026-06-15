import React from "react";
import { Box, Button, Card, Chip, Divider, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";

interface ServerErrorData {
  statusCode: number;
  message: string;
  details?: string;
}

export default function ServerError(): React.ReactElement {
  const { state } = useLocation();
  const error = state?.error as ServerErrorData | undefined;

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
              bgcolor: "error.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 28, color: "#fff" }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
              Server Error
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Something went wrong on our end
            </Typography>
          </Box>
          {error?.statusCode && (
            <Chip
              label={error.statusCode}
              size="small"
              sx={{
                ml: "auto",
                bgcolor: "error.main",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {error?.message && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>
              Message
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {error.message}
            </Typography>
          </Box>
        )}

        {error?.details && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}>
              Stack Trace
            </Typography>
            <Box
              component="pre"
              sx={{
                bgcolor: "secondary.main",
                color: "text.secondary",
                borderRadius: 2,
                p: 2,
                fontSize: "0.72rem",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                m: 0,
              }}
            >
              {error.details}
            </Box>
          </Box>
        )}

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
