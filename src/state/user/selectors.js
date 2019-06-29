import { createSelector } from "reselect";
import { INITIAL_STATE } from "./reducer";

export const selectUser = state => state.user || INITIAL_STATE;

export const getProfile = createSelector(
	selectUser,
	userState => userState.profile
);

export const getCurrentUser = createSelector(
	selectUser,
	userState => userState.currentUser
);

export const getUsers = createSelector(
	selectUser,
	userState => userState.usersList
);
