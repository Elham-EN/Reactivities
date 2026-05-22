import React from "react";
import type { Activitiy } from "../../lib/types/index.type";
import { Stack } from "@mui/material";
import ActivityCard from "./ActivityCard";

interface Props {
  activities: Activitiy[];
  selectActivity: (id: string) => void;
}

function ActivityList({
  activities,
  selectActivity,
}: Props): React.ReactElement {
  return (
    <Stack spacing={2}>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          selectActivity={selectActivity}
        />
      ))}
    </Stack>
  );
}

export default ActivityList;
