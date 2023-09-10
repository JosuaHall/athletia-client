import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = (props) => {
  const { isAuthenticated, type, user } = props;
  if (user.user) {
    console.log(user.user.isHeadAdminOfAhletia);
    if (
      type === "guest" &&
      isAuthenticated &&
      user.user.isHeadAdminOfAhletia === true
    ) {
      return <Redirect to={`/admin/dashboard`} />;
    } else if (
      type === "guest" &&
      isAuthenticated &&
      user.user.isHeadAdminOfAhletia === false
    ) {
      return <Redirect to={`/events/${user.user._id}`} />;
    } else if (type === "private" && !isAuthenticated)
      return <Redirect to={`/login`} />;
  }
  return <Route {...props} />;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userloaded: state.auth.userloaded,
  user: state.auth,
});

export default connect(mapStateToProps)(AuthRoute);
