import { Grid } from "@mui/material";
import React from "react";
import type { Activitiy } from "../../lib/types/index.type";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./form/ActivityForm";

interface Props {
  activities: Activitiy[];
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  selectedActivity: Activitiy | undefined;
  openForm: (id: string) => void; // Edit the form
  closeForm: () => void;
  editMode: boolean;
}

function ActivityDashboard({
  activities,
  cancelSelectActivity,
  selectActivity,
  selectedActivity,
  openForm,
  closeForm,
  editMode,
}: Props): React.ReactElement {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm closeForm={closeForm} activity={selectedActivity} />
        )}
      </Grid>
    </Grid>
  );
}

export default ActivityDashboard;
