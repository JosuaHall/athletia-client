//not used
import React, { useHistory } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ path, exact, children }) => {
  const auth = useSelector((store) => store.isAuthenticated);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  return auth ? (
    <Redirect to={history.push(`/events/${user ? user._id : ""}`)} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
