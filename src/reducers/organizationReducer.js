import {
  ORGANIZATION_CREATED,
  ORGANIZATION_LIST_LOADED,
  ORGANIZATION_SELECTED,
  ORGANIZATION_LOADED,
  ALL_ORGANIZATION_LIST_LOADED,
  ORGANIZATION_UPDATED,
  FILTER_FOR_EVENTS_UPDATED,
  ALL_OWNER_REQUESTS_LOADED,
  ALL_ADMIN_CHANGE_REQUESTS_LOADED,
  ORGANIZATION_APPROVED,
  ORGANIZATION_DELETED,
  RESETED_CONTROL_VARIABLES,
  OWNERSHIP_REQUEST_APPROVED,
  OWNERSHIP_REQUEST_DELETED,
  CHANGE_ADMIN_REQUEST_APPROVED,
  CHANGE_ADMIN_REQUEST_DELETED,
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
  ownerRequests: "",
  isDeleted: false,
  isApproved: false,
  isOwnershipApproved: false,
  isOwnershipDeleted: false,
  headAdminChangeRequests: "",
  isAdminChangeApproved: false,
  isAdminChangeDeleted: false,
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
    case ALL_OWNER_REQUESTS_LOADED:
      return {
        ...state,
        ownerRequests: action.payload,
      };
    case ALL_ADMIN_CHANGE_REQUESTS_LOADED:
      return {
        ...state,
        headAdminChangeRequests: action.payload,
      };
    case ORGANIZATION_UPDATED:
      return {
        ...state,
        selected: action.payload,
      };
    case ORGANIZATION_DELETED:
      return {
        ...state,
        isDeleted: true,
      };
    case ORGANIZATION_APPROVED:
      return {
        ...state,
        isApproved: true,
      };
    case OWNERSHIP_REQUEST_APPROVED:
      return {
        ...state,
        isOwnershipApproved: true,
      };
    case OWNERSHIP_REQUEST_DELETED:
      return {
        ...state,
        isOwnershipDeleted: true,
      };
    case CHANGE_ADMIN_REQUEST_APPROVED:
      return {
        ...state,
        isAdminChangeApproved: true,
      };
    case CHANGE_ADMIN_REQUEST_DELETED:
      return {
        ...state,
        isAdminChangeDeleted: true,
      };
    case RESETED_CONTROL_VARIABLES:
      return {
        ...state,
        isApproved: false,
        isDeleted: false,
        isOwnershipApproved: false,
        isOwnershipDeleted: false,
        isAdminChangeApproved: false,
        isAdminChangeDeleted: false,
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
