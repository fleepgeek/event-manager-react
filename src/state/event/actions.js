import eventActionTypes from "./actionTypes";

export const fetchAllEvents = () => ({
	type: eventActionTypes.FETCH_ALL_EVENTS
});

export const fetchEventById = id => ({
	type: eventActionTypes.FETCH_EVENT_BY_ID,
	payload: { id }
});

export const fetchAllEventsSuccess = events => ({
	type: eventActionTypes.FETCH_ALL_EVENTS_SUCCESS,
	payload: { events }
});

export const fetchEventsByIdSuccess = event => ({
	type: eventActionTypes.FETCH_EVENT_BY_ID_SUCCESS,
	payload: { event }
});

export const addEvent = formData => ({
	type: eventActionTypes.ADD_EVENT,
	payload: { formData }
});

export const addEventsSuccess = events => ({
	type: eventActionTypes.FETCH_ALL_EVENTS_SUCCESS,
	payload: { events }
});
