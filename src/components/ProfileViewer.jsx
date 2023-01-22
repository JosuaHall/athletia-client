//currently not used
import React from "react";
import logo2 from "../pictures/paul.jpg";
import TeamsFollowedProfile from "./TeamsFollowedProfile";

const ProfileViewer = () => {
  return (
    <React.Fragment>
      <div className="profile-header">
        <div>
          <img src={logo2}></img>
        </div>
        <div className="profile-info">
          <div>
            <h4>paul2000suarez!</h4>
          </div>
          <div>
            <h3>Paul Suarez</h3>
          </div>
          <div>
            <p>21, csup soccer. Live life to the fullest!</p>
          </div>
        </div>
      </div>
      <div>
        <h3>Teams followed: 1</h3>
      </div>
      <TeamsFollowedProfile />
    </React.Fragment>
  );
};

export default ProfileViewer;
