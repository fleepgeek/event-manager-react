import { createSelector } from "reselect";
import { INITIAL_STATE } from "./reducer";

export const selectEvent = state => state.eventsList || INITIAL_STATE;

export const getAll = createSelector(
	selectEvent,
	eventState => eventState.all
);

export const getUserEvent = createSelector(
	selectEvent,
	userState => userState.userEvents
);

export const getUserCreatedEvents = createSelector(
	getUserEvent,
	eventState => eventState.created
);

export const getUserAttendingEvents = createSelector(
	getUserEvent,
	eventState => eventState.attending
);
