import * as actionTypes from "./actionTypes";

export const auth = payload => ({
    type: actionTypes.AUTH,
    payload
    // username,
    // password,
});

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const loginSuccess = (token, username, expirationDate) => ({
    type: actionTypes.LOGIN_SUCCESS,
    token,
    username,
    expirationDate
});

export const regSuccess = () => ({
    type: actionTypes.REG_SUCCESS,
});

export const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const logout = () => ({
    type: actionTypes.LOGOUT_START
});

export const logoutSuccess = () => ({
    type: actionTypes.LOGOUT_SUCCESS
});

export const authAutoLogout = expirationDate => ({
    type: actionTypes.AUTH_AUTO_LOGOUT,
    expirationDate
});

export const authAutoLogin = (token, username, expirationDate) => ({
    type: actionTypes.AUTH_AUTO_LOGIN,
    token,
    username,
    expirationDate
});

export const toggleLogin = () => ({
    type: actionTypes.TOGGLE_LOGIN,
});
