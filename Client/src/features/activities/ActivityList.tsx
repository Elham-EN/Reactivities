import React from "react";
import { Stack } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../lib/hooks/useActivities";

function ActivityList(): React.ReactElement {
  const { activities } = useActivities();

  return (
    <Stack spacing={2}>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </Stack>
  );
}

export default ActivityList;
