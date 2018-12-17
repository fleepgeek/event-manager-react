import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  error: false,
  loading: false,
  events: []
};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EVENTS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_EVENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.FETCH_EVENTS_SUCCESS:
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
