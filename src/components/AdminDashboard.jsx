import React, { useEffect, useState } from "react";
import { Switch, Link, useLocation } from "react-router-dom";
import AuthRoute from "./auth/AuthRoute";
import AdminDashboardRequest from "./AdminDashboardRequest";
import AdminDashboardRequestFromOwner from "./AdminDashboardRequestFromOwner";
import AdminDashboardBecomeOwnerRequest from "./AdminDashboardBecomeOwnerRequest";
import AdminDashboardChangeHeadAdminRequest from "./AdminDashboardChangeHeadAdminRequest";
import AdminDashboardTableHeaders from "./AdminDashboardTableHeaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "reactstrap";
import {
  resetControlVariables,
  getAllRequestedOrganizations,
  getAllOwnerRequests,
  getAllChangeOfHeadAdminRequests,
} from "../actions/organizationActions";

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const requestedOrganizations = useSelector(
    (state) => state.organization.allOrganizations
  );
  const isApproved = useSelector((state) => state.organization.isApproved);
  const isDeleted = useSelector((state) => state.organization.isDeleted);
  const isOwnershipApproved = useSelector(
    (state) => state.organization.isOwnershipApproved
  );
  const isOwnershipDeleted = useSelector(
    (state) => state.organization.isOwnershipDeleted
  );
  const isAdminChangeApproved = useSelector(
    (state) => state.organization.isAdminChangeApproved
  );
  const isAdminChangeDeleted = useSelector(
    (state) => state.organization.isAdminChangeDeleted
  );
  const organizationOwnerRequests = useSelector(
    (state) => state.organization.ownerRequests
  );
  const organizationChangeOfAdminRequests = useSelector(
    (state) => state.organization.headAdminChangeRequests
  );
  const [organizationsCreatedByOwner, setOrganizationsCreatedByOwner] =
    useState([]);
  const [organizationsCreatedNotByOwner, setOrganizationsCreatedNotByOwner] =
    useState([]);
  const [ownerRequests, setOwnerRequests] = useState([]);
  const [headAdminChangeRequests, setHeadAdminChangeRequests] = useState([]);
  const location = useLocation();

  useEffect(() => {
    //get all organizations with status=0
    dispatch(getAllRequestedOrganizations());

    //get all requests to become an owner of an Organization (as long an organization has no owner -> you can send requests)
    dispatch(getAllOwnerRequests());

    //get all change of head organization admin requests (if an organization has an owner and someoen wants to take the account over)
    dispatch(getAllChangeOfHeadAdminRequests());
  }, []);

  useEffect(() => {
    if (search !== "") {
      const filteredCreatedByOwner = organizationsCreatedByOwner.filter((org) =>
        org.name.toLowerCase().includes(search.toLowerCase())
      );
      const filteredCreatedNotByOwner = organizationsCreatedNotByOwner.filter(
        (org) => org.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [search, organizationsCreatedByOwner, organizationsCreatedNotByOwner]);

  useEffect(() => {
    //then filter organizations with owner and without
    //get all organizations status=0 and owner is assigned
    //get all organizations status=0 and NO owener is assigned
    const orgWithoutOwner = requestedOrganizations.filter((org) => !org.owner);
    console.log("orgWithout: ", orgWithoutOwner);
    setOrganizationsCreatedNotByOwner(orgWithoutOwner);

    const orgWithOwner = requestedOrganizations.filter((org) => org.owner);
    console.log("orgWith: ", orgWithOwner);
    setOrganizationsCreatedByOwner(orgWithOwner);
  }, [requestedOrganizations]);

  useEffect(() => {
    setOwnerRequests(organizationOwnerRequests);
  }, [organizationOwnerRequests]);

  useEffect(() => {
    setHeadAdminChangeRequests(organizationChangeOfAdminRequests);
  }, [organizationChangeOfAdminRequests]);

  useEffect(() => {
    if (isApproved) {
      setAlertMessage("Request successfully approved");
    } else if (isDeleted) {
      setAlertMessage("Organization deleted");
    } else if (isOwnershipApproved) {
      setAlertMessage("Owner successfully approved");
    } else if (isOwnershipDeleted) {
      setAlertMessage("Owner Request declined");
    } else if (isAdminChangeApproved) {
      setAlertMessage("Head Admin change approved");
    } else if (isAdminChangeDeleted) {
      setAlertMessage("Head Admin change declined");
    }

    // Clear the alert message after 3 seconds
    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 3000);

    // Clean up the timer on unmount or on subsequent changes to isApproved or isDeleted
    return () => clearTimeout(timer);
  }, [
    isApproved,
    isDeleted,
    isOwnershipApproved,
    isOwnershipDeleted,
    isAdminChangeApproved,
    isAdminChangeDeleted,
  ]);

  useEffect(() => {
    dispatch(getAllRequestedOrganizations());
    dispatch(resetControlVariables());
  }, [isApproved, isDeleted]);

  useEffect(() => {
    dispatch(getAllOwnerRequests());
    dispatch(resetControlVariables());
  }, [isOwnershipApproved, isOwnershipDeleted]);

  useEffect(() => {
    dispatch(getAllChangeOfHeadAdminRequests());
    dispatch(resetControlVariables());
  }, [isAdminChangeApproved, isAdminChangeDeleted]);

  return (
    <div className="dashboard">
      <div className="dashboard-navigation">
        <Link
          className={`navigation-button ${
            location.pathname ===
            "/admin/dashboard/organization/without/owner/requests"
              ? "selected"
              : ""
          }`}
          to={`/admin/dashboard/organization/without/owner/requests`}
        >
          <div>Organization Requests - From Owner</div>
        </Link>
        <Link
          className={`navigation-button ${
            location.pathname === "/admin/dashboard/organization/requests"
              ? "selected"
              : ""
          }`}
          to={`/admin/dashboard/organization/requests`}
        >
          <div>Organization Requests - Without Owner</div>
        </Link>
        <Link
          className={`navigation-button ${
            location.pathname === "/admin/dashboard/owner/requests"
              ? "selected"
              : ""
          }`}
          to={`/admin/dashboard/owner/requests`}
        >
          <div>Become Organization Admin Requests</div>
        </Link>
        <Link
          className={`navigation-button ${
            location.pathname ===
            "/admin/dashboard/change/organization/admin/requests"
              ? "selected"
              : ""
          }`}
          to={`/admin/dashboard/change/organization/admin/requests`}
        >
          <div>Change of Organization Admin Requests</div>
        </Link>
      </div>

      <div className="search">
        <div className="search-box p-2">
          <FontAwesomeIcon icon={["fa", "search"]} size="1x" />
          <input
            name="search"
            placeholder="Search"
            value={search}
            className="search-input"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            autoComplete="off"
          />
        </div>
      </div>
      {alertMessage && (
        <Alert
          color={
            alertMessage === "Organization deleted" ||
            alertMessage === "Owner Request declined"
              ? "danger"
              : "success"
          }
        >
          {alertMessage}
        </Alert>
      )}

      <Switch>
        <AuthRoute
          path="/admin/dashboard/organization/without/owner/requests"
          type="private"
        >
          <AdminDashboardTableHeaders
            styling={"dashboard-table-headers"}
            headers={["Logo", "Organization", "Created By Owner", "Approve"]}
          />
          {organizationsCreatedByOwner.length !== 0
            ? organizationsCreatedByOwner
                .filter((org) =>
                  search
                    ? org.name.toLowerCase().includes(search.toLowerCase())
                    : true
                )
                .map((org) => (
                  <AdminDashboardRequestFromOwner key={org._id} org={org} />
                ))
            : "No current Requests open"}
        </AuthRoute>
        <AuthRoute path="/admin/dashboard/organization/requests" type="private">
          <AdminDashboardTableHeaders
            styling={"dashboard-table-headers"}
            headers={["Logo", "Organization", "Created By User", "Approve"]}
          />
          {organizationsCreatedNotByOwner.length !== 0
            ? organizationsCreatedNotByOwner
                .filter((org) =>
                  search
                    ? org.name.toLowerCase().includes(search.toLowerCase())
                    : true
                )
                .map((org) => <AdminDashboardRequest key={org._id} org={org} />)
            : "No current Requests open"}
        </AuthRoute>
        <AuthRoute path="/admin/dashboard/owner/requests" type="private">
          <AdminDashboardTableHeaders
            styling={"dashboard-table-headers-owner-request"}
            headers={[
              "User Wants To Become an Owner of",
              "Logo",
              "Organization",
              "Approve Owner",
            ]}
          />
          {ownerRequests.length !== 0
            ? ownerRequests
                .filter((req) =>
                  search
                    ? req.organization.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    : true
                )
                .map((req) => (
                  <AdminDashboardBecomeOwnerRequest key={req._id} req={req} />
                ))
            : "No current Owner Requests open"}
        </AuthRoute>
        <AuthRoute
          path="/admin/dashboard/change/organization/admin/requests"
          type="private"
        >
          <AdminDashboardTableHeaders
            styling={"dashboard-table-headers-change-admin-request"}
            headers={[
              "User Wants To Become the new Head Admin of",
              "Logo",
              "Organization",
              "Current Admin",
              "Approve Admin Change",
            ]}
          />
          {headAdminChangeRequests.length !== 0
            ? headAdminChangeRequests
                .filter((req) =>
                  search
                    ? req.organization.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    : true
                )
                .map((req) => (
                  <AdminDashboardChangeHeadAdminRequest
                    key={req._id}
                    req={req}
                  />
                ))
            : "No current Organization Admin Change Requests open"}
        </AuthRoute>
      </Switch>
    </div>
  );
};

export default AdminDashboard;
