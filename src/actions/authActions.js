import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PROFILE_PICTURE_UPDATED,
  TEAM_FOLLOWED,
  TEAM_UNFOLLOWED,
  IS_FOLLOWED,
  NOT_FOLLOWED,
  SET_TEAMS_FOLLOWED_LIST,
  SET_ORGANIZATIONS_FOLLOWED_LIST,
  SET_SELECTED_FOLLOWED_ORGANIZATION,
  FILTERED_USER_LIST_LOADED,
} from "./types";

//Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

//update User profile
export const updateProfilePicture =
  ({ userid, logo }) =>
  (dispatch) => {
    const formData = new FormData();
    formData.append("userid", userid);
    formData.append("profileImg", logo);
    axios
      .put(`/api/organizations/updateProfilePicture/${userid}`, formData)
      .then((res) => {
        dispatch({ type: PROFILE_PICTURE_UPDATED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

// Register User
export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Request body
    const body = JSON.stringify({ name, email, password });

    axios
      .post("/api/users", body, config)
      .then((res) => {
        dispatch(clearErrors());
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

// Login User
export const login =
  ({ email, password }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Request body
    const body = JSON.stringify({ email, password });

    axios
      .post("/api/auth", body, config)
      .then((res) => {
        dispatch(clearErrors());
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const followTeam = (userid, orgid, teamid) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //Request body
  const body = JSON.stringify({ orgid, teamid });

  axios
    .put(`/api/users/follow/team/${userid}/${orgid}/${teamid}`, body, config)
    .then((res) => {
      dispatch({ type: TEAM_FOLLOWED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unfollowTeam = (userid, orgid, teamid) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //Request body
  const body = JSON.stringify({ orgid, teamid });

  axios
    .put(`/api/users/unfollow/team/${userid}/${orgid}/${teamid}`, body, config)
    .then((res) => {
      dispatch({ type: TEAM_UNFOLLOWED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const isTeamFollowed = (followed) => (dispatch) => {
  if (followed) dispatch({ type: IS_FOLLOWED });
  dispatch({ type: NOT_FOLLOWED });
};

export const setTeamsFollowed = (teams) => (dispatch) => {
  dispatch({ type: SET_TEAMS_FOLLOWED_LIST, payload: teams });
};

export const setOrganizationsFollowed = (organizations) => (dispatch) => {
  dispatch({
    type: SET_ORGANIZATIONS_FOLLOWED_LIST,
    payload: organizations,
  });
};

export const selectFollowedOrganization = (organization) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_FOLLOWED_ORGANIZATION,
    payload: organization,
  });
};

export const getFilteredUsers = (search_string) => (dispatch) => {
  axios
    .get(`/api/users/get/filtered/users`, {
      params: { name: search_string },
    })
    .then((res) => {
      dispatch({ type: FILTERED_USER_LIST_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
