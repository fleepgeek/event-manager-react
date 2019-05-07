import authActionTypes from "./actionTypes";

export const auth = (formData, isLogin) => ({
	type: authActionTypes.AUTH,
	payload: { formData, isLogin }
});

export const authStart = () => ({
	type: authActionTypes.AUTH_START
});

export const loginSuccess = (token, username) => ({
	type: authActionTypes.LOGIN_SUCCESS,
	payload: { token, username }
});

export const regSuccess = () => ({
	type: authActionTypes.REG_SUCCESS
});

export const authFail = error => ({
	type: authActionTypes.AUTH_FAIL,
	payload: { error }
});

export const logout = () => ({
	type: authActionTypes.LOGOUT
});

export const logoutSuccess = () => ({
	type: authActionTypes.LOGOUT_SUCCESS
});

export const autoLogin = () => ({
	type: authActionTypes.AUTO_LOGIN
});

export const autoLogout = expirationDate => ({
	type: authActionTypes.AUTO_LOGOUT,
	payload: { expirationDate }
});
