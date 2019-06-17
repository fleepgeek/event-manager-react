import eventsActionTypes from "./actionTypes";

export const getAllEvents = () => ({
	type: eventsActionTypes.GET_ALL_EVENTS
});

export const getAllEventsSuccess = events => ({
	type: eventsActionTypes.GET_ALL_EVENTS_SUCCESS,
	payload: { events }
});

export const getUserEvents = userId => ({
	type: eventsActionTypes.GET_USER_EVENTS,
	payload: { userId }
});

export const getUserEventsSuccess = (created, attending) => ({
	type: eventsActionTypes.GET_USER_EVENTS_SUCCESS,
	payload: { created, attending }
});
