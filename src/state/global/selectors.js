import { createSelector } from "reselect";
import { INITIAL_STATE } from "./reducer";

export const selectGlobal = state => state.global || INITIAL_STATE;

export const getLoading = createSelector(
	selectGlobal,
	globalState => globalState.loading
);

export const getMessage = createSelector(
	selectGlobal,
	globalState => globalState.message
);

export const getMessageOpen = createSelector(
	selectGlobal,
	globalState => globalState.messageOpen
);

export const getModalOpen = createSelector(
	selectGlobal,
	globalState => globalState.modalOpen
);

export const getRedirectPath = createSelector(
	selectGlobal,
	globalState => globalState.redirectPath
);
