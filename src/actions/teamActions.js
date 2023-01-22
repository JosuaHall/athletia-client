import {
  TEAM_CREATED,
  TEAM_SELECTED,
  TEAM_ADMIN_REQUEST_SENT,
  TEAM_ADMIN_REQUESTS_LOADED,
  TEAM_ADMIN_REQUEST_UPDATED,
  TEAM_DELETED,
  SPORTS_LOADED,
} from "./types";
import axios from "axios";

export const createTeam =
  ({ userid, organizationid, sport, admin }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //Request body
    const body = JSON.stringify({ userid, organizationid, sport, admin });

    axios
      .put(
        `/api/organizations/create/team/${userid}/${organizationid}`,
        body,
        config
      )
      .then((res) => {
        dispatch({ type: TEAM_CREATED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const deleteTeam =
  ({ org, id }) =>
  (dispatch) => {
    axios
      .put(`/api/organizations/delete/team/${id}/${org}`)
      .then((res) => {
        dispatch({ type: TEAM_DELETED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const setCurrentTeam = (id) => (dispatch) => {
  dispatch({ type: TEAM_SELECTED, payload: id });
};

export const getTeamList = (userid, organizationid) => (dispatch) => {
  axios.get(`/api/organizations/organization/teams`);
};

export const getSports = () => (dispatch) => {
  axios
    .get(`/api/organizations/get/sports`)
    .then((res) => {
      dispatch({ type: SPORTS_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendTeamAdminRequest =
  (request_by_user, user_recipient, organization, team, status) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //Request body
    const body = JSON.stringify({
      request_by_user,
      user_recipient,
      organization,
      team,
      status,
    });

    axios
      .post(
        `/api/organizations/send/team/admin/request/${request_by_user}/${user_recipient}`,
        body,
        config
      )
      .then((res) => {
        dispatch({ type: TEAM_ADMIN_REQUEST_SENT, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getTeamAdminRequests = (request_by_user, team) => (dispatch) => {
  axios
    .get(
      `/api/organizations/get/team/admin/requests/${request_by_user}/${team}`
    )
    .then((res) => {
      dispatch({ type: TEAM_ADMIN_REQUESTS_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadTeamAdminRequests = (user_recipient) => (dispatch) => {
  axios
    .get(`/api/organizations/load/team/admin/requests/${user_recipient}`)
    .then((res) => {
      dispatch({ type: TEAM_ADMIN_REQUESTS_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const acceptRequest = (id) => (dispatch) => {
  axios
    .put(`/api/organizations/accept/request/${id}`)
    .then((res) => {
      dispatch({ type: TEAM_ADMIN_REQUEST_UPDATED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTeamAdminRequestEntry = (id) => (dispatch) => {
  axios
    .delete(`/api/organizations/delete/team/admin/request/entry/${id}`)
    .then((res) => {
      dispatch({ type: TEAM_ADMIN_REQUEST_UPDATED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
