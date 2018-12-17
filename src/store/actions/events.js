import * as actionTypes from "./actionTypes";

export const fetchEventsStart = () => (
  {
      type: actionTypes.FETCH_EVENTS_START,
  }
)

export const fetchEventsFail = (error) => (
  {
      type: actionTypes.FETCH_EVENTS_FAIL,
      error,
  }
)

export const fetchEventsSuccess = (events) => (
  {
      type: actionTypes.FETCH_EVENTS_SUCCESS,
      events,
  }
)

export const fetchEvents = () => (
  {
      type: actionTypes.FETCH_EVENTS,
  }
)