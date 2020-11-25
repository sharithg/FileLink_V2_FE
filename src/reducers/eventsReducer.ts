import {
  IEventsState,
  IActionEvents,
  ADD_EVENT,
  GET_EVENTS,
  EVENTS_LOADED,
} from "../actions/types";

const initialState: IEventsState = {
  events: [],
  eventsLoaded: false,
};

function eventsReducer(
  state = initialState,
  action: IActionEvents
): IEventsState {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case EVENTS_LOADED:
      return {
        ...state,
        eventsLoaded: true,
      };
    default:
      return state;
  }
}

export default eventsReducer;
