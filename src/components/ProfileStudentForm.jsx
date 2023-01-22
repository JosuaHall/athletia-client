//currently not used
import React from "react";

const ProfileStudentForm = () => {
  return (
    <React.Fragment>
      <div>
        <label for="NetID">NetID:</label>
      </div>
      <div>
        <input className="input2" type="text" placeholder="NetID" />
      </div>
      <div>
        <label for="team">Are you in a team?</label>
      </div>
      <div>
        <select name="team" id="team">
          <option value="mens soccer">Men's Soccer</option>
          <option value="womens basketball">Women's Basketball</option>
        </select>
      </div>
      <div>
        <label for="teamInterest">
          What sport teams are you most interested in following on campus?
        </label>
      </div>
      <div>
        <select name="team" id="team">
          <option value="mens soccer">Men's Soccer</option>
          <option value="womens soccer">Women's Basketball</option>
        </select>
      </div>
    </React.Fragment>
  );
};

export default ProfileStudentForm;
