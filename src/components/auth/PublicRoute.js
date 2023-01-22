//not used
import React from "react";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ component: Component, isAuthenticated, ...children }) {
  return (
    <Route
      render={(props) =>
        isAuthenticated ? (
          <Redirect to="/events" />
        ) : (
          <Component {...props} {...children} />
        )
      }
    />
  );
}

export default PublicRoute;
