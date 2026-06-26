import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { Activitiy } from "../../../lib/types/index.type";
import { format } from "date-fns";

interface Props {
  activity: Activitiy;
}

function splitIntoParagraphs(text: string): string[] {
  // If the text already has explicit paragraph breaks, honour them directly
  if (text.includes("\n\n")) return text.split("\n\n").filter(Boolean);
  // Otherwise extract individual sentences using a regex that matches up to
  // a .!? and any trailing whitespace
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  // Accumulate groups of 3 sentences into a single paragraph string
  const paragraphs: string[] = [];
  // Step through the sentence array 3 at a time
  for (let i = 0; i < sentences.length; i += 3) {
    // Join the current chunk of up to 3 sentences and strip surrounding whitespace
    paragraphs.push(
      sentences
        .slice(i, i + 3)
        .join(" ")
        .trim(),
    );
  }
  return paragraphs;
}

function ActivityDetailsInfo({ activity }: Props): React.ReactElement {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = format(
    new Date(activity.date),
    "EEEE, MMMM d, yyyy 'at' h:mm a",
  );

  const paragraphs = splitIntoParagraphs(activity.description);
  const isLong = paragraphs.length > 1;
  const preview = paragraphs.slice(0, 1);
  const rest = paragraphs.slice(1);

  return (
    <Card
      elevation={0}
      sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <CalendarTodayOutlinedIcon
            sx={{ fontSize: 18, color: "primary.main", flexShrink: 0 }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {formattedDate}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}
        >
          <LocationOnOutlinedIcon
            sx={{
              fontSize: 18,
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

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
          <InfoOutlinedIcon
            sx={{
              fontSize: 18,
              color: "primary.main",
              flexShrink: 0,
              mt: "2px",
            }}
          />
          <Box sx={{ flex: 1 }}>
            {preview.map((p, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.8, mb: 1.5 }}
              >
                {p}
              </Typography>
            ))}

            {isLong && (
              <Collapse in={expanded}>
                {rest.map((p, i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.8, mb: 1.5 }}
                  >
                    {p}
                  </Typography>
                ))}
              </Collapse>
            )}

            {isLong && (
              <Box
                sx={{
                  mt: 1,
                  pt: 1,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Link
                  component="button"
                  variant="body2"
                  underline="none"
                  onClick={() => setExpanded((prev) => !prev)}
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  {expanded ? "↑ Show less" : "↓ Read more"}
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ActivityDetailsInfo;
