import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  deleteOrganization,
  approveOrganization,
} from "../actions/organizationActions";

const AdminDashboardRequestFromOwner = ({ org }) => {
  const dispatch = useDispatch();

  const deniedClicked = (orgid) => {
    dispatch(deleteOrganization(orgid));
  };

  const approvedClicked = (orgid) => {
    dispatch(approveOrganization(orgid));
  };

  return (
    <div className="dashboard-table-headers">
      <div className="logo">
        {org.logo ? (
          <img width={100} src={org.logo} alt="pb" />
        ) : (
          <FontAwesomeIcon icon={["fa", "user"]} size="2x" color="grey" />
        )}
      </div>
      <div>
        <b>{org.name}</b>
      </div>
      <div className="user-card">
        <div className="image">
          {org.owner.profileImg ? (
            <img width={100} src={org.owner.profileImg} alt="" />
          ) : (
            <FontAwesomeIcon icon={["fa", "user"]} size="2x" color="grey" />
          )}
        </div>
        <div className="user-card-info">
          <div>
            <b>Username</b>
          </div>
          <div>{`@${org.owner.name}`}</div>
        </div>
        <div className="user-card-info">
          <div>
            <b>First-/Lastname</b>
          </div>
          <div>{`${org.owner.firstName} ${org.owner.lastName}`}</div>
        </div>
        <div className="user-card-info">
          <div>
            <b>Email</b>
          </div>
          <div>{org.owner.email}</div>
        </div>
      </div>
      <div className="dashboard-table-buttons">
        <div className="denied-button" onClick={() => deniedClicked(org._id)}>
          <FontAwesomeIcon icon={["fa", "minus"]} size="1x" color="white" />
        </div>
        <div
          className="approve-button"
          onClick={() => approvedClicked(org._id)}
        >
          <FontAwesomeIcon icon={["fa", "check"]} size="1x" color="white" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardRequestFromOwner;
