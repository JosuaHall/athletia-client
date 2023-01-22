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
  SET_ORGANIZATIONS_FOLLOWED_LIST,
  SET_TEAMS_FOLLOWED_LIST,
  SET_SELECTED_FOLLOWED_ORGANIZATION,
  FILTERED_USER_LIST_LOADED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  userloaded: false,
  isLoading: false,
  user: null,
  team_followed: false,
  organizations_followed: [],
  followed_teams: [],
  anyOrg_followed: "",
  org_selected_id: "",
  filtered_users: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        followed_teams: action.payload.teams_followed,
        userloaded: true,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userloaded: true,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        userloaded: false,
        isAuthenticated: false,
        isLoading: false,
      };
    case PROFILE_PICTURE_UPDATED:
      return {
        ...state,
        ...action.payload,
      };
    case TEAM_FOLLOWED:
      return {
        ...state,
        user: action.payload,
        team_followed: true,
      };
    case TEAM_UNFOLLOWED:
      return {
        ...state,
        user: action.payload,
        team_followed: false,
      };
    case IS_FOLLOWED:
      return {
        ...state,
        team_followed: true,
      };
    case NOT_FOLLOWED:
      return {
        ...state,
        team_followed: false,
      };
    case SET_TEAMS_FOLLOWED_LIST:
      return {
        ...state,
        followed_teams: action.payload,
      };
    case SET_ORGANIZATIONS_FOLLOWED_LIST:
      return {
        ...state,
        organizations_followed: action.payload,
      };
    case SET_SELECTED_FOLLOWED_ORGANIZATION:
      return {
        ...state,
        anyOrg_followed: action.payload,
      };
    case FILTERED_USER_LIST_LOADED:
      return {
        ...state,
        filtered_users: action.payload,
      };
    default:
      return state;
  }
}
