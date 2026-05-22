import { Grid, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import type { Activitiy } from "../../lib/types/index.type";

interface Props {
  activities: Activitiy[];
}

export default function ActivityDashboard({
  activities,
}: Props): React.ReactElement {
  return (
    <Grid container>
      <Grid size={9}>
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemText>{activity.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
