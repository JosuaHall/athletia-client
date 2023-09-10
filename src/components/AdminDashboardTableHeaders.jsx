import React from "react";

const AdminDashboardTableHeaders = ({ headers, styling }) => {
  return (
    <div className={styling}>
      <div>
        <h3>{headers[0]}</h3>
      </div>
      <div>
        <h3>{headers[1]}</h3>
      </div>
      <div>
        <h3>{headers[2]}</h3>
      </div>
      <div>
        <h3>{headers[3]}</h3>
      </div>
      {headers[4] ? (
        <div>
          <h3>{headers[4]}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default AdminDashboardTableHeaders;
