import produce from "immer";
import authTypes from "./types";

// Reducer
export const INITIAL_STATE = {
	token: localStorage.getItem("token"),
	username: localStorage.getItem("username"),
	loading: false,
	error: null,
	isLogin: true,
	authRedirectPath: "/"
};

export const authStart = (draft, payload) => {
	draft.loading = true;
};

export const loginSuccess = (draft, payload) => {
	draft.token = payload.token;
	draft.username = payload.username;
};

export const authFail = (draft, payload) => {
	draft.loading = false;
	draft.error = payload.error;
};

export const logoutSuccess = draft => {
	draft.token = null;
	draft.username = null;
};

export const regSuccess = (draft, payload) => {
	draft.loading = false;
};

export const toggleLogin = (draft, payload) => {
	draft.isLogin = !draft.isLogin;
};

const authReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		switch (type) {
			case authTypes.AUTH_START:
				return authStart(draft, payload);
			case authTypes.LOGIN_SUCCESS:
				return loginSuccess(draft, payload);
			case authTypes.AUTH_FAIL:
				return authFail(draft, payload);
			case authTypes.LOGOUT_SUCCESS:
				return logoutSuccess(draft, payload);
			case authTypes.REG_SUCCESS:
				return regSuccess(draft, payload);
			case authTypes.TOGGLE_LOGIN:
				return toggleLogin(draft, payload);
			default:
				return state;
		}
	});

export default authReducer;
