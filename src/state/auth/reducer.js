import produce from "immer";
import authActionTypes from "./actionTypes";

// Reducer
export const INITIAL_STATE = {
	token: localStorage.getItem("token"),
	username: localStorage.getItem("username"),
	loading: false,
	error: null,
	authRedirectPath: "/"
};

const authReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case authActionTypes.LOGIN_SUCCESS:
				draft.token = payload.token;
				draft.username = payload.username;
				break;
			case authActionTypes.LOGOUT_SUCCESS:
				draft.token = null;
				draft.username = null;
				break;
			case authActionTypes.REG_SUCCESS:
				draft.loading = false;
				break;
		}
	});
// Notice that it is not needed to handle the default case,
// a producer that doesn't do anything will simply return the original state.

export default authReducer;
