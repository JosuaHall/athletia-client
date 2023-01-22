import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = (props) => {
  const { isAuthenticated, type, user } = props;
  if (user.user) {
    if (type === "guest" && isAuthenticated) {
      //history.replace(`${lo}/${user._id}`);
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
