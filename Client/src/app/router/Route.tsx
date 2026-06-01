import { createBrowserRouter } from "react-router";
import { Suspense } from "react";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import ActivityForm, {
  EditActivityForm,
} from "../../features/activities/form/ActivityForm";
import LoadingFallback from "../../lib/components/LoadingFallback";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";

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
            <ActivityDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "activities/create",
        element: <ActivityForm />,
      },
      {
        path: "activities/edit/:id",
        element: (
          <Suspense
            fallback={<LoadingFallback message="Loading activity form" />}
          >
            <EditActivityForm />
          </Suspense>
        ),
      },
    ],
  },
]);
