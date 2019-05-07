import eventActionTypes from "./actionTypes";

export const fetchAllEvents = () => ({
	type: eventActionTypes.FETCH_ALL_EVENTS
});

export const fetchEventById = id => ({
	type: eventActionTypes.FETCH_EVENT_BY_ID,
	payload: { id }
});

export const fetchEventStart = () => ({
	type: eventActionTypes.FETCH_EVENT_START
});

export const fetchAllEventsSuccess = events => ({
	type: eventActionTypes.FETCH_ALL_EVENTS_SUCCESS,
	payload: { events }
});

export const fetchEventsByIdSuccess = event => ({
	type: eventActionTypes.FETCH_EVENT_BY_ID_SUCCESS,
	payload: { event }
});

export const fetchActionFailed = error => ({
	type: eventActionTypes.EVENT_ACTION_FAILED,
	payload: { error }
});

export const addEvent = formData => ({
	type: eventActionTypes.ADD_EVENT,
	payload: { formData }
});

export const addEventInit = () => ({
	type: eventActionTypes.ADD_EVENT_INIT
});

export const addEventsSuccess = events => ({
	type: eventActionTypes.FETCH_ALL_EVENTS_SUCCESS,
	payload: { events }
});
