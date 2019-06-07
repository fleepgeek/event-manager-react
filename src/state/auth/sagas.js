import { put, takeEvery, all, delay } from "redux-saga/effects";
import authActionTypes from "./actionTypes";
import * as authActions from "./actions";
import * as globalActions from "../global/actions";
import axios from "../../utils/axios-base";

function* authSaga(action) {
	try {
		yield put(globalActions.showLoading());
		const { formData, isLogin } = action.payload;
		let endPoint = isLogin ? "auth/" : "auth/register/";
		const response = yield axios.post(endPoint, formData);
		const { token, uid, expires } = response.data;
		if (isLogin) {
			localStorage.setItem("token", token);
			localStorage.setItem("uid", uid);
			localStorage.setItem("expirationDate", expires);
			yield put(authActions.loginSuccess(token, uid));
			yield put(globalActions.hideLoading());
		} else {
			yield put(globalActions.hideLoading());
			yield put(authActions.regSuccess());
		}
	} catch (error) {
		yield put(globalActions.showMessage(error.response.data.detail));
	}
}

function* logoutSaga(action) {
	localStorage.removeItem("token");
	localStorage.removeItem("uid");
	localStorage.removeItem("expirationDate");

	yield put(authActions.logoutSuccess());
}

function* authAutoLogoutSaga(action) {
	yield delay(action.payload.expirationDate);
	try {
		yield put(authActions.logout());
	} catch (error) {
		yield put(globalActions.showMessage(error.response.data.detail));
	}
}

function* authAutoLoginSaga(action) {
	const token = localStorage.getItem("token");
	try {
		if (token === null) {
			yield put(authActions.logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			const uid = localStorage.getItem("uid");
			if (expirationDate > new Date()) {
				yield put(authActions.loginSuccess(token, uid));
				yield put(
					authActions.autoLogout(
						expirationDate.getTime() - new Date().getTime()
					)
				);
			} else {
				yield put(authActions.logout());
			}
		}
	} catch (error) {
		yield put(globalActions.showMessage(error.response.data.detail));
	}
}

// Watcher
export default function* watchAuthActions() {
	yield all([
		takeEvery(authActionTypes.AUTH, authSaga),
		takeEvery(authActionTypes.LOGOUT, logoutSaga),
		takeEvery(authActionTypes.AUTO_LOGIN, authAutoLoginSaga),
		takeEvery(authActionTypes.AUTO_LOGOUT, authAutoLogoutSaga)
	]);
}
