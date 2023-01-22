import React from "react";
import CreateSchool from "./CreateSchool";

import SchoolList from "./SchoolList";

const SchoolDetails = () => {
  return (
    <div className="school-details">
      <h5 className="mb-4">Your Organization</h5>
      <SchoolList />
      <CreateSchool />
    </div>
  );
};

export default SchoolDetails;
