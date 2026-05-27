import { Grid } from "@mui/material";
import React, { Suspense } from "react";
import ActivityList from "./ActivityList";
import LoadingFallback from "../../lib/components/LoadingFallback";

function ActivityDashboard(): React.ReactElement {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
        Activity Filter
      </Grid>
      <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
        <Suspense fallback={<LoadingFallback message="Loading activities" />}>
          <ActivityList />
        </Suspense>
      </Grid>
    </Grid>
  );
}

export default ActivityDashboard;
