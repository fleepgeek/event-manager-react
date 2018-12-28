// Actions
export const FETCH_EVENTS = "[events] FETCH_EVENTS";
export const FETCH_EVENTS_START = "[events] FETCH_EVENTS_START";
export const FETCH_EVENTS_FAIL = "[events] FETCH_EVENTS_FAIL";
export const FETCH_EVENTS_SUCCESS = "[events] FETCH_EVENTS_SUCCESS";

// Action Creators
export const fetchEventsStart = () => ({
  type: FETCH_EVENTS_START
});

export const fetchEventsFail = error => ({
  type: FETCH_EVENTS_FAIL,
  error
});

export const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  events
});

export const fetchEvents = () => ({
  type: FETCH_EVENTS
});

// Reducer
const INITIAL_STATE = {
  error: null,
  loading: false,
  events: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EVENTS_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_EVENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.events
      };
    default:
      return state;
  }
};

export default reducer;
