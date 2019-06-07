import eventsActionTypes from "./actionTypes";

export const fetchAllEvents = () => ({
	type: eventsActionTypes.FETCH_ALL_EVENTS
});

export const fetchAllEventsSuccess = events => ({
	type: eventsActionTypes.FETCH_ALL_EVENTS_SUCCESS,
	payload: { events }
});
