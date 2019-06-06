import eventActionTypes from "./actionTypes";

export const eventPageUnloaded = () => ({
	type: eventActionTypes.EVENT_PAGE_UNLOADED
});

export const fetchEventById = id => ({
	type: eventActionTypes.FETCH_EVENT_BY_ID,
	payload: { id }
});

export const fetchEventsByIdSuccess = event => ({
	type: eventActionTypes.FETCH_EVENT_BY_ID_SUCCESS,
	payload: { event }
});

export const addEvent = formData => ({
	type: eventActionTypes.ADD_EVENT,
	payload: { formData }
});

export const getAttendees = eventId => ({
	type: eventActionTypes.GET_ATTENDEES,
	payload: { eventId }
});

export const getAttendeesSuccess = attendees => ({
	type: eventActionTypes.GET_ATTENDEES_SUCCESS,
	payload: { attendees }
});

export const attendEvent = eventId => ({
	type: eventActionTypes.ATTEND_EVENT,
	payload: { eventId }
});

export const attendEventSuccess = attendee => ({
	type: eventActionTypes.ATTEND_EVENT_SUCCESS,
	payload: { attendee }
});

export const cancelAttendance = eventId => ({
	type: eventActionTypes.CANCEL_ATTENDANCE,
	payload: { eventId }
});

export const cancelAttendanceSuccess = userId => ({
	type: eventActionTypes.CANCEL_ATTENDANCE_SUCCESS,
	payload: { userId }
});
