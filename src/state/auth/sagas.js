import { put, takeEvery, all, delay, select } from "redux-saga/effects";
import authTypes from "./types";
import * as actions from "./actions";
import * as authSelectors from "./selectors";
import axios from "../../utils/axios-base";

function* authSaga(action) {
	try {
		yield put(actions.authStart());
		const { formData } = action.payload;
		const isLogin = yield select(authSelectors.getIsLogin);
		// const state = yield select();
		// const isLogin = state.auth.isLogin;
		// console.log(isLogin);

		let endPoint = isLogin ? "auth/" : "auth/register/";
		const response = yield axios.post(endPoint, formData);
		const { token, username, expires } = response.data;
		console.log(response);
		if (isLogin) {
			localStorage.setItem("token", token);
			localStorage.setItem("username", username);
			localStorage.setItem("expirationDate", expires);
			yield put(actions.loginSuccess(token, username));
		} else {
			yield put(actions.regSuccess());
		}
	} catch (error) {
		console.log({ error });

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
	yield delay(action.payload.expirationDate);
	try {
		yield put(actions.logout());
	} catch (error) {
		yield put(actions.authFail(error.response.data.detail));
	}
}

function* authAutoLoginSaga(action) {
	const token = localStorage.getItem("token");
	try {
		if (token === null) {
			yield put(actions.logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			const username = localStorage.getItem("username");
			if (expirationDate > new Date()) {
				yield put(actions.loginSuccess(token, username));
				yield put(
					actions.autoLogout(expirationDate.getTime() - new Date().getTime())
				);
			} else {
				yield put(actions.logout());
			}
		}
	} catch (error) {
		yield put(actions.authFail(error.response.data.detail));
	}
}

// Watcher
export default function* watchAuthActions() {
	yield all([
		takeEvery(authTypes.AUTH, authSaga),
		takeEvery(authTypes.LOGOUT, logoutSaga),
		takeEvery(authTypes.AUTO_LOGIN, authAutoLoginSaga),
		takeEvery(authTypes.AUTO_LOGOUT, authAutoLogoutSaga)
	]);
}
