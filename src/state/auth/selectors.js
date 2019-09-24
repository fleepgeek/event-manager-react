import { createSelector } from "reselect";
import { INITIAL_STATE } from "./reducer";

export const selectAuth = state => state.auth || INITIAL_STATE;

export const getToken = createSelector(
	selectAuth,
	authState => authState.token
);

export const getUid = createSelector(
	selectAuth,
	authState => parseInt(authState.uid)
);

export const getIsAuthenticated = createSelector(
	selectAuth,
	authState => authState.token !== null
);

export const getIsRegistered = createSelector(
	selectAuth,
	authState => authState.isRegistered
);

export const getAuthRedirectPath = createSelector(
	selectAuth,
	authState => authState.authRedirectPath
);
