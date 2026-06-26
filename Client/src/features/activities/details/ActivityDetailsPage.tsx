import React from "react";
import { Grid, Stack } from "@mui/material";
import { useParams } from "react-router";
import { useActivity } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityChat from "./ActivityChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import MapComponent from "../../../lib/components/MapComponent";

export default function ActivityDetailsPage(): React.ReactElement {
  const { id } = useParams();
  const { activity } = useActivity(id!);

  return (
    <Grid container spacing={3} sx={{ pb: 6 }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Stack spacing={3}>
          <ActivityDetailsHeader activity={activity} />
          <ActivityDetailsInfo activity={activity} />
          <MapComponent
            position={[activity.latitude, activity.longitude]}
            venue={activity.venue}
          />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack
          spacing={3}
          sx={{ position: { xs: "static", md: "sticky" }, top: 80 }}
        >
          <ActivityDetailsSidebar />
          <ActivityChat />
        </Stack>
      </Grid>
    </Grid>
  );
}
