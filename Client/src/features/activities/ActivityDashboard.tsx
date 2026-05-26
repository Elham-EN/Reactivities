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
  deleteActivity: (id: string) => void;
}

function ActivityDashboard({
  activities,
  cancelSelectActivity,
  selectActivity,
  selectedActivity,
  openForm,
  closeForm,
  editMode,
  deleteActivity,
}: Props): React.ReactElement {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            selectedActivity={selectedActivity}
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
