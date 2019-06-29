import produce from "immer";
import userActionTypes from "./actionTypes";

// Reducer
export const INITIAL_STATE = {
	profile: {},
	currentUser: {},
	usersList: []
};

const userReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case userActionTypes.GET_PROFILE_SUCCESS:
				draft.profile = payload.profile;
				break;
			case userActionTypes.UPDATE_USER_SUCCESS:
			case userActionTypes.GET_CURRENT_USER_SUCCESS:
				draft.currentUser = payload.user;
				break;
			case userActionTypes.GET_USERS_SUCCESS:
				draft.usersList = payload.users;
				break;
		}
	});
// Notice that it is not needed to handle the default case,
// a producer that doesn't do anything will simply return the original state.

export default userReducer;
