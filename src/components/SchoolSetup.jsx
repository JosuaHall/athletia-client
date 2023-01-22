//currently not used
import React from "react";
import { Link } from "react-router-dom";

import TeamSetup from "./TeamSetup";

const SchoolSetup = () => {
  return (
    <React.Fragment>
      <h3>Setting up Your Organization Profile</h3>
      <div className="school-setup-page">
        <div>
          <div>
            <ul>
              <li>
                <Link to="/setup/school" className="link">
                  Organization Details
                </Link>
              </li>
              <li>
                <Link to="/create/teams" className="link">
                  Team Management
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SchoolSetup;
