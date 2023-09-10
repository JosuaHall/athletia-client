import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  approveChangeOfHeadAdmin,
  deleteChangeOfHeadAdminRequest,
} from "../actions/organizationActions";

const AdminDashboardChangeHeadAdminRequest = ({ req }) => {
  const dispatch = useDispatch();

  const deniedClicked = (reqid) => {
    dispatch(deleteChangeOfHeadAdminRequest(reqid));
  };

  const approvedClicked = (reqid, orgid, userid) => {
    dispatch(approveChangeOfHeadAdmin(reqid, orgid, userid));
  };

  return (
    <div className="dashboard-table-headers-change-admin-request">
      <div className="user-card-change-admin">
        <div className="image">
          {req.requesting_admin.profileImg ? (
            <img width={100} src={req.requesting_admin.profileImg} alt="" />
          ) : (
            <FontAwesomeIcon icon={["fa", "user"]} size="2x" color="grey" />
          )}
        </div>
        <div className="user-card-change-admin-info">
          <div>
            <b>Username</b>
          </div>
          <div>{`@${req.requesting_admin.name}`}</div>
        </div>
        <div className="user-card-change-admin-info">
          <div>
            <b>Name</b>
          </div>
          <div>
            {`${req.requesting_admin.firstName} ${req.requesting_admin.lastName}`}
          </div>
        </div>
        <div className="user-card-change-admin-info">
          <div>
            <b>Email</b>
          </div>
          <div>{req.requesting_admin.email}</div>
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

      <div className="user-card-change-admin">
        <div className="image">
          {req.organization.owner.profileImg ? (
            <img width={100} src={req.organization.owner.profileImg} alt="" />
          ) : (
            <FontAwesomeIcon icon={["fa", "user"]} size="2x" color="grey" />
          )}
        </div>
        <div className="user-card-change-admin-info">
          <div>
            <b>Username</b>
          </div>
          <div>{`@${req.organization.owner.name}`}</div>
        </div>
        <div className="user-card-change-admin-info">
          <div>
            <b>Name</b>
          </div>
          <div>
            {`${req.organization.owner.firstName} ${req.organization.owner.lastName}`}
          </div>
        </div>
        <div className="user-card-change-admin-info">
          <div>
            <b>Email</b>
          </div>
          <div>{req.organization.owner.email}</div>
        </div>
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
              req.requesting_admin._id
            )
          }
        >
          <FontAwesomeIcon icon={["fa", "check"]} size="1x" color="white" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardChangeHeadAdminRequest;
