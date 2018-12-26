import { takeEvery } from "redux-saga/effects";
import { getEventsSaga } from "./events";
import { authSaga, logoutSaga, authAutoLogoutSaga, authAutoLoginSaga } from "./auth";
import * as actionTypes from "../actions/actionTypes";

export function* watchEvents() {
    yield takeEvery(actionTypes.FETCH_EVENTS, getEventsSaga);
}

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH, authSaga);
    yield takeEvery(actionTypes.LOGOUT_START, logoutSaga);
    yield takeEvery(actionTypes.AUTH_AUTO_LOGIN, authAutoLoginSaga);
    yield takeEvery(actionTypes.AUTH_AUTO_LOGOUT, authAutoLogoutSaga);
}
