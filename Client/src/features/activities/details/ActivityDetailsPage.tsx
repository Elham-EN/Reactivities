import React from "react";
import { Grid, Stack } from "@mui/material";
import { useParams } from "react-router";
import { useActivity } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityChat from "./ActivityChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default function ActivityDetailsPage(): React.ReactElement {
  const { id } = useParams();
  const { activity } = useActivity(id!);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Stack spacing={3}>
          <ActivityDetailsHeader activity={activity} />
          <ActivityDetailsInfo activity={activity} />
          <ActivityChat />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ActivityDetailsSidebar />
      </Grid>
    </Grid>
  );
}
