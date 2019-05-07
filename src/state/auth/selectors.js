import { createSelector } from "reselect";
import { INITIAL_STATE } from "./reducer";

export const selectAuth = state => state.auth || INITIAL_STATE;

export const getToken = createSelector(
	selectAuth,
	authState => authState.token
);

export const getIsAuthenticated = createSelector(
	selectAuth,
	authState => authState.token !== null
);

export const getAuthRedirectPath = createSelector(
	selectAuth,
	authState => authState.authRedirectPath
);

export const getLoading = createSelector(
	selectAuth,
	authState => authState.loading
);

export const getError = createSelector(
	selectAuth,
	authState => authState.error
);
