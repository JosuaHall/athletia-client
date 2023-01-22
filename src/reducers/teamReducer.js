import {
  TEAM_CREATED,
  TEAM_SELECTED,
  TEAM_ADMIN_REQUEST_SENT,
  TEAM_ADMIN_REQUESTS_LOADED,
  TEAM_ADMIN_REQUEST_UPDATED,
  TEAM_DELETED,
  SPORTS_LOADED,
} from "../actions/types";

const initialState = {
  sport: "",
  admin: "",
  isCreated: false,
  team_list: [],
  selected_team: "",
  isLoading: false,
  team_admin_request: "",
  team_admin_requests_list: "",
  all_sports: "",
  msg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEAM_CREATED:
      return {
        ...state,
        team_list: action.payload.teams,
      };
    case TEAM_DELETED:
      return {
        ...state,
        team_list: action.payload.teams,
      };
    case TEAM_SELECTED:
      return {
        ...state,
        selected_team: action.payload,
      };
    case TEAM_ADMIN_REQUEST_SENT:
      return {
        ...state,
        team_admin_request: action.payload,
      };
    case TEAM_ADMIN_REQUEST_UPDATED:
      return {
        ...state,
        team_admin_request: action.payload,
      };
    case TEAM_ADMIN_REQUESTS_LOADED:
      return {
        ...state,
        team_admin_requests_list: action.payload,
      };
    case SPORTS_LOADED:
      return {
        ...state,
        all_sports: action.payload,
      };
    default:
      return state;
  }
}
