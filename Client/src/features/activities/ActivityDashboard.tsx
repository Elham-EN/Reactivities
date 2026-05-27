import { Grid } from "@mui/material";
import React, { Suspense } from "react";
import ActivityList from "./ActivityList";
import LoadingFallback from "../../lib/components/LoadingFallback";

function ActivityDashboard(): React.ReactElement {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <Suspense fallback={<LoadingFallback message="Loading activities" />}>
          <ActivityList />
        </Suspense>
      </Grid>
      <Grid size={5}>Activity Filter</Grid>
    </Grid>
  );
}

export default ActivityDashboard;
