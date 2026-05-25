import React from "react";
import type { Activitiy } from "../../lib/types/index.type";
import { Container, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";

import { useActivities } from "../../lib/hooks/useActivities";

function App(): React.ReactElement {
  const [selectedActivity, setSelectedActivity] = React.useState<
    Activitiy | undefined
  >(undefined);
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string): void => {
    setSelectedActivity(activities!.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = (): void => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string): void => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = (): void => {
    setEditMode(false);
  };

  const handleDelete = (id: string): void => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");
  };

  return (
    <>
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            deleteActivity={handleDelete}
          />
        )}
      </Container>
    </>
  );
}

export default App;
