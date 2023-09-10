import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NotFound from "./components/NotFound";
import { connect } from "react-redux";

import store from "./store";
import { loadUser } from "./actions/authActions";
import AppNavbar from "./components/AppNavbar";
import LoginModal from "./components/auth/LoginModal";

import RegisterModal from "./components/auth/RegisterModal";
import AuthRoute from "./components/auth/AuthRoute";
import Profile from "./components/Profile";

import TeamSetup from "./components/TeamSetup";
import ProfileSetup from "./components/ProfileSetup";
import TeamManagement from "./components/TeamManagement";

import AdminDashboard from "./components/AdminDashboard";

import SchoolDetails from "./components/SchoolDetails";
import TeamDetails from "./components/TeamDetails";
import Home from "./components/Home";
import InformationPage from "./components/InformationPage";
import EventCards from "./components/EventCards";
import YourTeams from "./components/YourTeams";
import TeamManagementAdmin from "./components/TeamManagementAdmin";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <React.Fragment>
        <AppNavbar />
        <div className="App">
          <Switch>
            <Route path="/not-found" component={NotFound} />

            <AuthRoute
              path="/your/team/management/:teamid/:userid"
              type="private"
            >
              <TeamManagement />
            </AuthRoute>
            <AuthRoute path="/setup/school/:id" type="private">
              <SchoolDetails />
            </AuthRoute>
            <AuthRoute path="/profile/settings/:id" type="private">
              <Profile />
            </AuthRoute>
            <AuthRoute path="/setup/team/:id" type="private">
              <TeamManagement />
            </AuthRoute>
            <AuthRoute path="/your/teams/:id" type="private">
              <YourTeams />
            </AuthRoute>
            <AuthRoute
              path="/manage/team/:userid/:organizationid"
              type="private"
            >
              <TeamDetails />
            </AuthRoute>
            <AuthRoute path="/schedule/:organizationid/:teamid" type="private">
              <EventCards />
            </AuthRoute>
            <AuthRoute path="/create/teams" type="private">
              <TeamSetup />
            </AuthRoute>
            <AuthRoute path="/register/setup" type="guest">
              <ProfileSetup />
            </AuthRoute>
            <AuthRoute path="/admin/dashboard" type="private">
              <AdminDashboard />
            </AuthRoute>
            <AuthRoute path="/events/:id" type="private">
              <Home />
            </AuthRoute>
            <AuthRoute path="/register" type="guest">
              <RegisterModal />
            </AuthRoute>
            <AuthRoute path="/login" type="guest">
              <LoginModal />
            </AuthRoute>
            <AuthRoute excat path="/" type="guest">
              <InformationPage />
            </AuthRoute>
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(App);
