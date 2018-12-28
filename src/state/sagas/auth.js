import { put, takeEvery, all } from "redux-saga/effects";
import { delay } from "redux-saga";
import { actionTypes, actions } from "../auth";
import axios from "../../utils/axios-base";

function* authSaga(action) {
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

function* logoutSaga(action) {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("expirationDate");

  yield put(actions.logoutSuccess());
}

function* authAutoLogoutSaga(action) {
  yield delay(action.expirationDate);
  yield put(actions.logout());
}

function* authAutoLoginSaga(action) {
  const token = localStorage.getItem("token");
  if (token === null) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    const username = localStorage.getItem("username");
    if (expirationDate > new Date()) {
      yield put(actions.loginSuccess(token, username, expirationDate));
      yield put(
        actions.authAutoLogout(expirationDate.getTime() - new Date().getTime())
      );
    } else {
      yield put(actions.logout());
    }
  }
}

// Watcher
export default function* watchAuthActions() {
  yield all([
    takeEvery(actionTypes.AUTH, authSaga),
    takeEvery(actionTypes.LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_AUTO_LOGIN, authAutoLoginSaga),
    takeEvery(actionTypes.AUTH_AUTO_LOGOUT, authAutoLogoutSaga)
  ]);
}
