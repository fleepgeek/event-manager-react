import { createActions, createReducer } from "reduxsauce";

// Actions
const { Types, Creators } = createActions(
  {
    fetchEventsStart: null,
    fetchEventsFail: ["error"],
    fetchEventsSuccess: ["events"],
    fetchEvents: null
  },
  { prefix: "[eventList] " }
);

export const actionTypes = Types;
export const actions = Creators;

// Reducer
const INITIAL_STATE = {
  error: null,
  loading: false,
  events: []
};

export const fetchEventsStart = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true
  };
};
export const fetchEventsFail = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
export const fetchEventsSuccess = (state = INITIAL_STATE, action) => {  
  return {
    ...state,
    loading: false,
    events: action.events
  };
};

const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_EVENTS_START]: fetchEventsStart,
  [Types.FETCH_EVENTS_FAIL]: fetchEventsFail,
  [Types.FETCH_EVENTS_SUCCESS]: fetchEventsSuccess
});

export default reducer;
