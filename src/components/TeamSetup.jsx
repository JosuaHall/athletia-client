import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import TeamDetails from "./TeamDetails";

const TeamSetup = () => {
  return (
    <React.Fragment>
      <h3>Setting up Your Schools Profile</h3>
      <div className="school-setup-page">
        <div>
          <ul>
            <li>
              <Link to="/setup/school" className="link">
                Club/School Details
              </Link>
            </li>
            <li>
              <Link to="/create/teams" className="link">
                Create Teams
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <TeamDetails />
    </React.Fragment>
  );
};

export default TeamSetup;
