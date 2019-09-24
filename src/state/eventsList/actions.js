import eventsActionTypes from "./actionTypes";

export const getAllEvents = () => ({
	type: eventsActionTypes.GET_ALL_EVENTS
});

export const getAllEventsSuccess = events => ({
	type: eventsActionTypes.GET_ALL_EVENTS_SUCCESS,
	payload: { events }
});

export const saveEvent = (formData, id = null) => ({
	type: eventsActionTypes.SAVE_EVENT,
	payload: { formData, id }
});

export const createEventSuccess = event => ({
	type: eventsActionTypes.CREATE_EVENT_SUCCESS,
	payload: { event }
});

export const updateEventSuccess = event => ({
	type: eventsActionTypes.UPDATE_EVENT_SUCCESS,
	payload: { event }
});

export const deleteEvent = id => ({
	type: eventsActionTypes.DELETE_EVENT,
	payload: { id }
});

export const deleteEventSuccess = id => ({
	type: eventsActionTypes.DELETE_EVENT_SUCCESS,
	payload: { id }
});

export const getUserEvents = userId => ({
	type: eventsActionTypes.GET_USER_EVENTS,
	payload: { userId }
});

export const getUserEventsSuccess = (created, attending) => ({
	type: eventsActionTypes.GET_USER_EVENTS_SUCCESS,
	payload: { created, attending }
});

export const getCategories = () => ({
	type: eventsActionTypes.GET_CATEGORIES
});

export const getCategoriesSuccess = categories => ({
	type: eventsActionTypes.GET_CATEGORIES_SUCCESS,
	payload: { categories }
});

export const getTags = () => ({
	type: eventsActionTypes.GET_TAGS
});

export const getTagsSuccess = tags => ({
	type: eventsActionTypes.GET_TAGS_SUCCESS,
	payload: { tags }
});
