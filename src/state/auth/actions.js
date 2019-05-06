import authTypes from "./types";

export const auth = formData => ({
	type: authTypes.AUTH,
	payload: { formData }
});

export const authStart = () => ({
	type: authTypes.AUTH_START
});

export const loginSuccess = (token, username) => ({
	type: authTypes.LOGIN_SUCCESS,
	payload: { token, username }
});

export const regSuccess = () => ({
	type: authTypes.REG_SUCCESS
});

export const authFail = error => ({
	type: authTypes.AUTH_FAIL,
	payload: { error }
});

export const logout = () => ({
	type: authTypes.LOGOUT
});

export const logoutSuccess = () => ({
	type: authTypes.LOGOUT_SUCCESS
});

export const autoLogin = () => ({
	type: authTypes.AUTO_LOGIN
});

export const autoLogout = expirationDate => ({
	type: authTypes.AUTO_LOGOUT,
	payload: { expirationDate }
});

export const toggleLogin = () => ({
	type: authTypes.TOGGLE_LOGIN
});
