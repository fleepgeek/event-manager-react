import { createSelector } from "reselect";
import { INITIAL_STATE } from "./reducer";

export const selectEvent = state => state.events || INITIAL_STATE;

export const getAll = createSelector(
	selectEvent,
	eventState => eventState.all
);
