//currently not used
import React from "react";
import FilesUploadComponent from "./FilesUploadComponent";

const ProfileSetup = () => {
  return (
    <div className="profile-setup">
      <h1>Let's set up your profile!</h1>
      <div className="school-setup-add-logo">
        <FilesUploadComponent />
      </div>
      <div className="register-inputs">
        <div>
          <label>First Name</label>
          <input type="First Name" placeholder="Paul" disabled={true} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="Last Name" placeholder="Suarez" disabled={true} />
        </div>
        <div>
          <label>Username</label>
          <input type="Username" placeholder="pas2000Suarez" disabled={true} />
        </div>
      </div>
      <div className="bio-input">
        <label>Bio (150 characters)</label>
        <textarea
          type="Bio"
          placeholder="150 characters"
          cols="40"
          rows="5"
          autoFocus
        />
      </div>
      <div>
        <button type="button" className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
