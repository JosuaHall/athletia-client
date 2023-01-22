//currently not used
import React from "react";

const SchoolCompetitors = () => {
  return (
    <div>
      <div>
        <h5>
          Enter{" "}
          <u>
            <b>Competitors</b>
          </u>{" "}
          Full Names
        </h5>
      </div>
      <div className="school-setup-info">
        <div>
          <b>Add Competitor(s)</b>
        </div>
        <div>
          <button type="button" className="btn btn-outline-dark m-2 py-1 px-5">
            Add New
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolCompetitors;
