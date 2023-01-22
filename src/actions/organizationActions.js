import {
  ORGANIZATION_CREATED,
  ORGANIZATION_LIST_LOADED,
  ORGANIZATION_LOADED,
  ORGANIZATION_SELECTED,
  ALL_ORGANIZATION_LIST_LOADED,
  ORGANIZATION_UPDATED,
  FILTER_FOR_EVENTS_UPDATED,
} from "./types";
import axios from "axios";

export const createOrganization =
  ({ user, logo, name }) =>
  (dispatch) => {
    // Headers

    //Request body
    //const body = JSON.stringify({ name, admin_email });
    const formData = new FormData();
    formData.append("owner", user);
    formData.append("logo", logo);
    formData.append("name", name);

    axios
      .post(`/api/organizations/create/${user}`, formData)
      .then((res) => {
        dispatch({ type: ORGANIZATION_CREATED, payload: res.data });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

export const getOrganizationList = (id) => (dispatch) => {
  axios
    .get(`/api/organizations/list/${id}`)
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

export const getOrganization = (organizationid) => (dispatch) => {
  axios
    .get(`/api/organizations/organization/${organizationid}`)
    .then((res) => {
      dispatch({ type: ORGANIZATION_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllOrganizations = () => (dispatch) => {
  axios
    .get(`/api/organizations/get/all`)
    .then((res) => {
      dispatch({ type: ALL_ORGANIZATION_LIST_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const attendEvent = (orgid, teamid, eventid, userid) => (dispatch) => {
  axios
    .put(
      `/api/organizations/event/attend/${orgid}/${teamid}/${eventid}/${userid}`
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
      `/api/organizations/event/unattend/${orgid}/${teamid}/${eventid}/${userid}`
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
