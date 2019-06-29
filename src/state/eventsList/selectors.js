import { createSelector } from "reselect";
import { INITIAL_STATE } from "./reducer";

export const selectEventsList = state => state.eventsList || INITIAL_STATE;

export const getAll = createSelector(
	selectEventsList,
	eventState => eventState.all
);

export const getUserEvent = createSelector(
	selectEventsList,
	userState => userState.userEvents
);

export const getUserCreatedEvents = createSelector(
	getUserEvent,
	eventsListState => eventsListState.created
);

export const getUserAttendingEvents = createSelector(
	getUserEvent,
	eventsListState => eventsListState.attending
);

export const getCategories = createSelector(
	selectEventsList,
	eventsListState => eventsListState.categories
);

export const getTags = createSelector(
	selectEventsList,
	eventsListState => eventsListState.tags
);
