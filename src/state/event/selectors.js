import { createSelector } from "reselect";
import { INITIAL_STATE } from "./reducer";

export const selectEvent = state => state.event || INITIAL_STATE;

export const getById = createSelector(
	selectEvent,
	eventState => eventState.event || {}
);

export const getAttendees = createSelector(
	selectEvent,
	eventState => eventState.attendees
);
