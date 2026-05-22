import React from "react";
import type { Activitiy } from "../../lib/types/index.type";
import axios from "axios";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

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
      <Typography variant="h1">Reactivities</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
