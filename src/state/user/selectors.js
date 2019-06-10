import { createSelector } from "reselect";
import { INITIAL_STATE } from "./reducer";

export const selectUser = state => state.user || INITIAL_STATE;

export const getProfile = createSelector(
	selectUser,
	userState => userState.profile
);

export const getEvent = createSelector(
	selectUser,
	userState => userState.event
);

export const getCreatedEvents = createSelector(
	getEvent,
	eventState => eventState.created
);

export const getAttendingEvents = createSelector(
	getEvent,
	eventState => eventState.attending
);
