import userActionTypes from "./actionTypes";

export const getProfile = userId => ({
	type: userActionTypes.GET_PROFILE,
	payload: { userId }
});

export const getProfileSuccess = profile => ({
	type: userActionTypes.GET_PROFILE_SUCCESS,
	payload: { profile }
});

export const getCurrentUser = () => ({
	type: userActionTypes.GET_CURRENT_USER
});

export const getCurrentUserSuccess = user => ({
	type: userActionTypes.GET_CURRENT_USER_SUCCESS,
	payload: { user }
});

export const getUsers = () => ({
	type: userActionTypes.GET_USERS
});

export const getUsersSuccess = users => ({
	type: userActionTypes.GET_USERS_SUCCESS,
	payload: { users }
});

export const updateUser = () => ({
	type: userActionTypes.UPDATE_USER
});

export const updateUserSuccess = user => ({
	type: userActionTypes.UPDATE_USER_SUCCESS,
	payload: { user }
});
