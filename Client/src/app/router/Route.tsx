import { createBrowserRouter, Navigate } from "react-router";
import { Suspense } from "react";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import ActivityForm, {
  EditActivityForm,
} from "../../features/activities/form/ActivityForm";
import LoadingFallback from "../../lib/components/LoadingFallback";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/account/LoginForm";
import RouteErrorBoundary from "./RouteErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // any auth-gated query anywhere under / gets covered, not just the two routes
    errorElement: <RouteErrorBoundary />,
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
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "*",
        element: <Navigate replace to={"/not-found"} />,
      },
    ],
  },
  {
    path: "/account/login",
    element: <LoginForm />,
  },
]);
