import { put } from "redux-saga/effects";
import { delay } from "redux-saga";
import * as actions from "../actions";
import axios from "../axios-base";

export function* authSaga(action) {
    yield put(actions.authStart());
    try {
        const { formData, isLogin } = action.payload;
        let endPoint = isLogin ? "auth/" : "auth/register/";
        const response = yield axios.post(endPoint, formData);
        const { token, username, expires } = response.data;
        console.log(response);
        if (isLogin) {
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("expirationDate", expires);
            yield put(actions.loginSuccess(token, username, expires));
        } else {
            yield put(actions.regSuccess());
        }
    } catch (error) {
        console.log(error.response.data);
        yield put(actions.authFail(error.response.data.detail));
    }
}

export function* logoutSaga(action) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("expirationDate");

    yield put(actions.logoutSuccess());
}

export function* authAutoLogoutSaga(action) {
    yield delay(action.expirationTime);
    yield put(actions.logout());
}

export function* authAutoLoginSaga(action) {
    const { token, username, expirationDate } = action;
    if (token === null) {
        yield put(actions.logout());
    } else {
        if (expirationDate > new Date().getTime()) {
            yield put(actions.loginSuccess(token, username, expirationDate));
            yield put(
                actions.authAutoLogout(
                    expirationDate.getTime() - new Date().getTime()
                )
            );
        } else {
            yield put(actions.logout());
        }
    }
}
