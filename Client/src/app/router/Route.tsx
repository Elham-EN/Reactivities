import { createBrowserRouter } from "react-router";
import { Suspense } from "react";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import LoadingFallback from "../../lib/components/LoadingFallback";
import ActivityDetails from "../../features/activities/ActivityDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "activities",
        element: <ActivityDashboard />,
      },
      {
        path: "activities/:id",
        element: (
          <Suspense fallback={<LoadingFallback message="Loading activity" />}>
            <ActivityDetails />
          </Suspense>
        ),
      },
      {
        path: "activities/create",
        element: (
          <Suspense fallback={<LoadingFallback message="Loading form" />}>
            <ActivityForm />
          </Suspense>
        ),
      },
    ],
  },
]);
