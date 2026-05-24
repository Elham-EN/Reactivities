import React from "react";
import type { Activitiy } from "../../lib/types/index.type";
import axios from "axios";
import { Container } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";

function App(): React.ReactElement {
  const [activities, setActivities] = React.useState<Activitiy[]>([]);
  const [selectedActivity, setSelectedActivity] = React.useState<
    Activitiy | undefined
  >(undefined);
  const [editMode, setEditMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    try {
      axios
        .get<Activitiy[]>("https://localhost:5001/api/Activities")
        .then((response) => setActivities(response.data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSelectActivity = (id: string): void => {
    setSelectedActivity(activities.find((x) => x.id === id));
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

  return (
    <>
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
        />
      </Container>
    </>
  );
}

export default App;
