import {
  ORGANIZATION_CREATED,
  ORGANIZATION_LIST_LOADED,
  ORGANIZATION_LOADED,
  ORGANIZATION_SELECTED,
  ALL_ORGANIZATION_LIST_LOADED,
  ORGANIZATION_UPDATED,
  FILTER_FOR_EVENTS_UPDATED,
  ALL_OWNER_REQUESTS_LOADED,
  ALL_ADMIN_CHANGE_REQUESTS_LOADED,
  ORGANIZATION_DELETED,
  ORGANIZATION_APPROVED,
  RESETED_CONTROL_VARIABLES,
  OWNERSHIP_REQUEST_APPROVED,
  OWNERSHIP_REQUEST_DELETED,
  CHANGE_ADMIN_REQUEST_APPROVED,
  CHANGE_ADMIN_REQUEST_DELETED,
} from "./types";
import axios from "axios";
import { proxy } from "../../package.json";

export const createOrganization =
  ({ user, logo, name }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    //Request body
    //const body = JSON.stringify({ name, admin_email });
    const formData = new FormData();
    formData.append("owner", user);
    formData.append("logo", logo);
    formData.append("name", name);

    axios
      .post(`${proxy}/api/organizations/create/${user}`, formData, config)
      .then((res) => {
        dispatch({ type: ORGANIZATION_CREATED, payload: res.data });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

export const deleteOrganization = (orgid) => (dispatch) => {
  axios
    .delete(`${proxy}/api/organizations/delete/organization/${orgid}`)
    .then((res) => {
      dispatch({ type: ORGANIZATION_DELETED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const approveOrganization = (orgid) => (dispatch) => {
  axios
    .put(`${proxy}/api/organizations/approve/organization/${orgid}`)
    .then((res) => {
      dispatch({ type: ORGANIZATION_APPROVED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteOwnershipRequest = (reqid) => (dispatch) => {
  axios
    .delete(`${proxy}/api/organizations/delete/ownership/request/${reqid}`)
    .then((res) => {
      dispatch({ type: OWNERSHIP_REQUEST_DELETED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const approveOwnership = (reqid, orgid, userid) => (dispatch) => {
  axios
    .put(
      `${proxy}/api/organizations/approve/ownership/${reqid}/${orgid}/${userid}`
    )
    .then((res) => {
      dispatch({ type: OWNERSHIP_REQUEST_APPROVED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteChangeOfHeadAdminRequest = (reqid) => (dispatch) => {
  axios
    .delete(`${proxy}/api/organizations/delete/admin/change/request/${reqid}`)
    .then((res) => {
      dispatch({ type: CHANGE_ADMIN_REQUEST_DELETED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const approveChangeOfHeadAdmin =
  (reqid, orgid, userid) => (dispatch) => {
    axios
      .put(
        `${proxy}/api/organizations/approve/admin/change/request/${reqid}/${orgid}/${userid}`
      )
      .then((res) => {
        dispatch({ type: CHANGE_ADMIN_REQUEST_APPROVED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getOrganizationList = (id) => (dispatch) => {
  axios
    .get(`${proxy}/api/organizations/list/${id}`)
    .then((res) => {
      dispatch({ type: ORGANIZATION_LIST_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const setCurrentOrganization = (id) => (dispatch) => {
  dispatch({ type: ORGANIZATION_SELECTED, payload: id });
};

export const resetControlVariables = (id) => (dispatch) => {
  dispatch({ type: RESETED_CONTROL_VARIABLES });
};

export const getOrganization = (organizationid) => (dispatch) => {
  axios
    .get(`${proxy}/api/organizations/organization/${organizationid}`)
    .then((res) => {
      dispatch({ type: ORGANIZATION_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllOrganizations = () => (dispatch) => {
  axios
    .get(`${proxy}/api/organizations/get/all`)
    .then((res) => {
      dispatch({ type: ALL_ORGANIZATION_LIST_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllRequestedOrganizations = () => (dispatch) => {
  axios
    .get(`${proxy}/api/organizations/get/all/requested`)
    .then((res) => {
      dispatch({ type: ALL_ORGANIZATION_LIST_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllOwnerRequests = () => (dispatch) => {
  axios
    .get(`${proxy}/api/organizations/get/all/owner/requests`)
    .then((res) => {
      dispatch({ type: ALL_OWNER_REQUESTS_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllChangeOfHeadAdminRequests = () => (dispatch) => {
  axios
    .get(`${proxy}/api/organizations/get/all/head/admin/change/requests`)
    .then((res) => {
      dispatch({ type: ALL_ADMIN_CHANGE_REQUESTS_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const attendEvent = (orgid, teamid, eventid, userid) => (dispatch) => {
  axios
    .put(
      `${proxy}/api/organizations/event/attend/${orgid}/${teamid}/${eventid}/${userid}`
    )
    .then((res) => {
      dispatch({ type: ORGANIZATION_UPDATED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unattendEvent = (orgid, teamid, eventid, userid) => (dispatch) => {
  axios
    .put(
      `${proxy}/api/organizations/event/unattend/${orgid}/${teamid}/${eventid}/${userid}`
    )
    .then((res) => {
      dispatch({ type: ORGANIZATION_UPDATED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setFilterForEvents = (filter) => (dispatch) => {
  dispatch({
    type: FILTER_FOR_EVENTS_UPDATED,
    payload: filter,
  });
};
