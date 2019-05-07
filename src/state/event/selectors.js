import { createSelector } from "reselect";
import { INITIAL_STATE } from "./reducer";

export const selectEvent = state => state.event || INITIAL_STATE;

export const getAll = createSelector(
	selectEvent,
	eventState => eventState.all
);

export const getById = createSelector(
	selectEvent,
	eventState => eventState.single
);

export const getLoading = createSelector(
	selectEvent,
	eventState => eventState.loading
);

export const getError = createSelector(
	selectEvent,
	eventState => eventState.error
);
