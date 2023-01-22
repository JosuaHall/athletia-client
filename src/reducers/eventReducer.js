import {
  EVENT_CREATED,
  EVENT_DELETED,
  EVENT_LINK_UPDATED,
  EVENT_LIST_LOADED,
  AMENITI_ADDED,
  AMENITI_REMOVED,
  EVENT_ATTENDING_LIST_LOADED,
} from "../actions/types";

const initialState = {
  date_time: "",
  competitor: "",
  ameniti: "",
  amenities: [String],
  event: "",
  event_list: "",
  isOpen: false,
  people_attending: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EVENT_CREATED:
      return {
        ...state,
        event_list: action.payload.teams,
      };
    case EVENT_DELETED:
      return {
        ...state,
        event_list: action.payload.teams,
      };
    case EVENT_LINK_UPDATED:
      return {
        ...state,
        event_list: action.payload.teams,
      };
    case EVENT_LIST_LOADED:
      return {
        ...state,
        event_list: action.payload.teams,
      };
    case AMENITI_ADDED:
      return {
        ...state,
        amenities: [...state.amenities, action.payload],
      };
    case AMENITI_REMOVED:
      return {
        ...state,
        amenities: action.payload,
      };
    case EVENT_ATTENDING_LIST_LOADED:
      return {
        ...state,
        people_attending: action.payload,
      };
    default:
      return state;
  }
}
