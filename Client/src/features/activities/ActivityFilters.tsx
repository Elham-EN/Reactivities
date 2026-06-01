import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Calendar from "react-calendar";

const filterOptions = [
  { value: "all", label: "All Events" },
  { value: "going", label: "I'm Going" },
  { value: "hosting", label: "I'm Hosting" },
];

function ActivityFilters(): React.ReactElement {
  const [filter, setFilter] = useState("all");
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Radio filter */}
      <Card
        elevation={0}
        sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, color: "text.primary", mb: 1.5 }}
          >
            Filter Activities
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          <RadioGroup
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "text.secondary",
                      "&.Mui-checked": { color: "primary.main" },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: filter === option.value ? 600 : 400,
                      color:
                        filter === option.value
                          ? "text.primary"
                          : "text.secondary",
                    }}
                  >
                    {option.label}
                  </Typography>
                }
                sx={{ mb: 0.5 }}
              />
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ pb: 0, pt: 2.5, px: 2.5 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
          >
            Filter by Date
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Select a date to browse activities
          </Typography>
        </CardContent>
        <Divider sx={{ mt: 1.5 }} />
        <Box sx={{ pb: 1.5, px: 1.5 }}>
          <Calendar onChange={(value) => setDate(value as Date)} value={date} />
        </Box>
      </Card>
    </Box>
  );
}

export default ActivityFilters;
