import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  approveOwnership,
  deleteOwnershipRequest,
} from "../actions/organizationActions";

const AdminDashboardBecomeOwnerRequest = ({ req }) => {
  const dispatch = useDispatch();

  const deniedClicked = (reqid) => {
    dispatch(deleteOwnershipRequest(reqid));
  };

  const approvedClicked = (reqid, orgid, userid) => {
    dispatch(approveOwnership(reqid, orgid, userid));
  };

  return (
    <div className="dashboard-table-headers-owner-request">
      <div className="user-card">
        <div className="image">
          {req.request_by_user.profileImg ? (
            <img width={100} src={req.request_by_user.profileImg} alt="" />
          ) : (
            <FontAwesomeIcon icon={["fa", "user"]} size="2x" color="grey" />
          )}
        </div>
        <div className="user-card-info">
          <div>
            <b>Username</b>
          </div>
          <div>{`@${req.request_by_user.name}`}</div>
        </div>
        <div className="user-card-info">
          <div>
            <b>First-/Lastname</b>
          </div>
          <div>{`${req.request_by_user.firstName} ${req.request_by_user.lastName}`}</div>
        </div>
        <div className="user-card-info">
          <div>
            <b>Email</b>
          </div>
          <div>{req.request_by_user.email}</div>
        </div>
      </div>

      <div className="logo">
        {req.organization.logo ? (
          <img width={100} src={req.organization.logo} alt="pb" />
        ) : (
          <FontAwesomeIcon icon={["fa", "user"]} size="2x" color="grey" />
        )}
      </div>
      <div>
        <b>{req.organization.name}</b>
      </div>

      <div className="dashboard-table-buttons">
        <div className="denied-button" onClick={() => deniedClicked(req._id)}>
          <FontAwesomeIcon icon={["fa", "minus"]} size="1x" color="white" />
        </div>
        <div
          className="approve-button"
          onClick={() =>
            approvedClicked(
              req._id,
              req.organization._id,
              req.request_by_user._id
            )
          }
        >
          <FontAwesomeIcon icon={["fa", "check"]} size="1x" color="white" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardBecomeOwnerRequest;
