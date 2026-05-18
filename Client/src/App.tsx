import React from "react";
import type { Activitiy } from "./lib/types/index.type";

function App(): React.ReactElement {
  const [activities, setActivities] = React.useState<Activitiy[]>([]);

  React.useEffect(() => {
    fetch("https://localhost:5001/api/Activities").then((response) =>
      response.json().then((data) => setActivities(data)),
    );
  }, []);

  return (
    <div>
      <h1>Reactivities</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
