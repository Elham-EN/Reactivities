import React from "react";
import { isAxiosError } from "axios";
import { useRouteError } from "react-router";
import Unauthorised from "../../features/errors/Unauthorised";
import ServerError from "../../features/errors/ServerError";

export default function RouteErrorBoundary(): React.ReactElement {
  const error = useRouteError();

  if (isAxiosError(error) && error.response?.status === 401) {
    return <Unauthorised />;
  }

  return <ServerError />;
}
