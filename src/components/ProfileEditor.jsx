//currently not used
import React from "react";
import logo2 from "../pictures/paul.jpg";

import TeamsFollowedProfile from "./TeamsFollowedProfile";

const ProfileEditor = () => {
  return (
    <React.Fragment>
      <div className="profile-header">
        <div>
          <img src={logo2}></img>
        </div>
        <div className="profile-info">
          <div>
            <input type="username" placeholder="paul2000suarez!" />
          </div>
          <div>
            <input type="name" placeholder="Paul Suarez" />
          </div>
          <div>
            <textarea name="bio" id="bio-profile" cols="30" rows="5"></textarea>
          </div>
          <div>
            <button className="btn btn-dark">Update</button>
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

export default ProfileEditor;
