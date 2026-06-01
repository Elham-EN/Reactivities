import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const fakeComments = [
  {
    id: 1,
    user: "Sarah K.",
    initial: "S",
    time: "2 hours ago",
    text: "Really excited for this one! Been to Borough Market before and the atmosphere is incredible.",
  },
  {
    id: 2,
    user: "James R.",
    initial: "J",
    time: "45 minutes ago",
    text: "Will there be vegetarian options available? Looking forward to joining!",
  },
  {
    id: 3,
    user: "Mia L.",
    initial: "M",
    time: "10 minutes ago",
    text: "Just signed up — can't wait. The chef demonstrations sound amazing.",
  },
];

function ActivityChat(): React.ReactElement {
  const [value, setValue] = useState("");

  return (
    <Card
      elevation={0}
      sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "text.primary", mb: 2.5 }}
        >
          Comments ({fakeComments.length})
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {fakeComments.map((comment, index) => (
            <Box key={comment.id}>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: "primary.main",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    flexShrink: 0,
                  }}
                >
                  {comment.initial}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {comment.user}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {comment.time}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.6 }}
                  >
                    {comment.text}
                  </Typography>
                </Box>
              </Box>
              {index < fakeComments.length - 1 && <Divider sx={{ mt: 2.5 }} />}
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2.5 }} />

        {/* Input */}
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              fontWeight: 700,
              fontSize: "0.85rem",
              flexShrink: 0,
            }}
          >
            B
          </Avatar>
          <OutlinedInput
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ borderRadius: 5, fontSize: "0.875rem" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  disabled={!value.trim()}
                  sx={{
                    color: value.trim() ? "primary.main" : "text.disabled",
                  }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ActivityChat;
