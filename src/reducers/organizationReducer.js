import {
  ORGANIZATION_CREATED,
  ORGANIZATION_LIST_LOADED,
  ORGANIZATION_SELECTED,
  ORGANIZATION_LOADED,
  ALL_ORGANIZATION_LIST_LOADED,
  ORGANIZATION_UPDATED,
  FILTER_FOR_EVENTS_UPDATED,
} from "../actions/types";

const initialState = {
  logo: "",
  name: "",
  admin_email: "",
  isCreated: false,
  organization_list: [],
  selected: "",
  isLoading: false,
  allOrganizations: "",
  msg: "",
  homeCheckBox: false,
  awayCheckBox: false,
  selectedOption: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ORGANIZATION_CREATED:
      return {
        ...state,
        logo: action.payload.logo,
        isCreated: true,
        name: action.payload.name,
        admin_email: action.payload.admin_email,
      };
    case ORGANIZATION_LIST_LOADED:
      return {
        ...state,
        selected: "",
        organization_list: action.payload,
      };
    case ORGANIZATION_SELECTED:
      return {
        ...state,
        isLoading: true,
        selected: action.payload,
      };
    case ORGANIZATION_LOADED:
      return {
        ...state,
        isLoading: false,
        selected: action.payload,
      };
    case ALL_ORGANIZATION_LIST_LOADED:
      return {
        ...state,
        allOrganizations: action.payload,
      };
    case ORGANIZATION_UPDATED:
      return {
        ...state,
        selected: action.payload,
      };
    case FILTER_FOR_EVENTS_UPDATED:
      return {
        ...state,
        homeCheckBox: action.payload.home,
        awayCheckBox: action.payload.away,
        selectedOption: action.payload.teams,
      };

    default:
      return state;
  }
}
