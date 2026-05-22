import { Grid } from "@mui/material";
import React from "react";
import type { Activitiy } from "../../lib/types/index.type";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activitiy[];
}

function ActivityDashboard({ activities }: Props): React.ReactElement {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList activities={activities} />
      </Grid>
      <Grid size={5}>{/* Sidebar placeholder */}</Grid>
    </Grid>
  );
}

export default ActivityDashboard;
