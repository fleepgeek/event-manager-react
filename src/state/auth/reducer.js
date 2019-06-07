import produce from "immer";
import authActionTypes from "./actionTypes";

// Reducer
export const INITIAL_STATE = {
	token: localStorage.getItem("token"),
	uid: localStorage.getItem("uid"),
	loading: false,
	error: null
};

const authReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case authActionTypes.LOGIN_SUCCESS:
				draft.token = payload.token;
				draft.uid = payload.uid;
				break;
			case authActionTypes.LOGOUT_SUCCESS:
				draft.token = null;
				draft.uid = null;
				break;
			case authActionTypes.REG_SUCCESS:
				draft.loading = false;
				break;
		}
	});
// Notice that it is not needed to handle the default case,
// a producer that doesn't do anything will simply return the original state.

export default authReducer;
