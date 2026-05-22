import React from "react";
import type { Activitiy } from "../../lib/types/index.type";
import axios from "axios";
import { Container } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";

function App(): React.ReactElement {
  const [activities, setActivities] = React.useState<Activitiy[]>([]);

  React.useEffect(() => {
    try {
      axios
        .get<Activitiy[]>("https://localhost:5001/api/Activities")
        .then((response) => setActivities(response.data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
}

export default App;
