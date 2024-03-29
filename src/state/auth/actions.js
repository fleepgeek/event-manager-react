import authActionTypes from "./actionTypes";

export const auth = (formData, isLogin) => ({
	type: authActionTypes.AUTH,
	payload: { formData, isLogin }
});

export const loginSuccess = (token, uid) => ({
	type: authActionTypes.LOGIN_SUCCESS,
	payload: { token, uid }
});

export const regSuccess = () => ({
	type: authActionTypes.REG_SUCCESS
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

export const autoLogout = expirationTime => ({
	type: authActionTypes.AUTO_LOGOUT,
	payload: { expirationTime }
});
