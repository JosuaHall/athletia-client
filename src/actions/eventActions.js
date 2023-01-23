import {
  EVENT_LIST_LOADED,
  EVENT_LINK_UPDATED,
  AMENITI_ADDED,
  AMENITI_REMOVED,
  ORGANIZATION_LOADED,
  EVENT_CREATED,
  EVENT_DELETED,
  EVENT_ATTENDING_LIST_LOADED,
  ORGANIZATION_UPDATED,
} from "./types";
import axios from "axios";
import { proxy } from "../../package.json";

export const createEvent =
  ({ teamid, date_time, competitor, home_away }, amenities) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //Request body
    const body = JSON.stringify({
      teamid,
      date_time,
      competitor,
      home_away,
      amenities,
    });

    axios
      .put(`${proxy}/api/organizations/create/event/${teamid}`, body, config)
      .then((res) => {
        dispatch({ type: EVENT_CREATED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const deleteEvent =
  ({ orgid, teamid, eventid }) =>
  (dispatch) => {
    axios
      .put(
        `${proxy}/api/organizations/delete/event/${orgid}/${teamid}/${eventid}`
      )
      .then((res) => {
        dispatch({ type: EVENT_DELETED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getEventList = (teamid) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //Request body
  const body = JSON.stringify({ teamid });

  axios
    .get(`${proxy}/api/organizations/event/list/${teamid}`, body, config)
    .then((res) => {
      dispatch({ type: EVENT_LIST_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateEventLiveStreamLink =
  ({ orgid, teamid, eventid }, link) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //Request body
    const body = JSON.stringify({ link });
    axios
      .put(
        `${proxy}/api/organizations/update/event/stream/link/${orgid}/${teamid}/${eventid}`,
        body,
        config
      )
      .then((res) => {
        dispatch({ type: EVENT_LINK_UPDATED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const addAmeniti = (item) => (dispatch) => {
  dispatch({ type: AMENITI_ADDED, payload: item });
};

export const removeAmeniti = (updated) => (dispatch) => {
  dispatch({ type: AMENITI_REMOVED, payload: updated });
};

export const getEventAttendingUserList =
  (orgid, teamid, eventid) => (dispatch) => {
    // Headers
    axios
      .get(
        `${proxy}/api/organizations/event/attending/users/${orgid}/${teamid}/${eventid}`
      )
      .then((res) => {
        dispatch({ type: ORGANIZATION_UPDATED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
