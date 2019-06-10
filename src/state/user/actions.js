import userActionTypes from "./actionTypes";

export const getProfile = userId => ({
	type: userActionTypes.GET_PROFILE,
	payload: { userId }
});

export const getProfileSuccess = profile => ({
	type: userActionTypes.GET_PROFILE_SUCCESS,
	payload: { profile }
});

export const getEvents = userId => ({
	type: userActionTypes.GET_EVENTS,
	payload: { userId }
});

export const getCreatedEventsSuccess = events => ({
	type: userActionTypes.GET_CREATED_EVENTS,
	payload: { events }
});

export const getAttendingEventsSuccess = events => ({
	type: userActionTypes.GET_ATTENDING_EVENTS,
	payload: { events }
});
