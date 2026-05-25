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

  const handleSumbitForm = (activity: Activitiy): void => {
    // // Edit / Update activity
    // if (activity.id) {
    //   // Either set state to updated activity if id exits otherwise
    //   // the original activity
    //   setActivities(
    //     activities.map((x) => (x.id === activity.id ? activity : x)),
    //   );
    //   // Create new activity
    // } else {
    //   const newActivity = { ...activity, id: activities.length.toString() };
    //   setSelectedActivity(newActivity);
    //   // Add new activity
    //   setActivities([...activities, newActivity]);
    // }
    setEditMode(false);
  };

  const handleDelete = (id: string): void => {
    // setActivities(activities.filter((x) => x.id !== id));
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
            submitForm={handleSumbitForm}
            deleteActivity={handleDelete}
          />
        )}
      </Container>
    </>
  );
}

export default App;
