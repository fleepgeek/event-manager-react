import { put, takeEvery, all, select } from "redux-saga/effects";
import userActionTypes from "./actionTypes";
import * as userActions from "./actions";
import * as globalActions from "../global/actions";
import authActionTypes from "../auth/actionTypes";
import { authSelectors } from "../auth";
import axios from "../../utils/axios-base";
import getHttpError from "../../utils/getHttpError";

function* getProfileSaga({ payload }) {
	try {
		yield put(globalActions.showLoading());
		const { userId } = payload;
		const response = yield axios.get(`users/${userId}/`);
		yield put(userActions.getProfileSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

function* getCurrentUserSaga() {
	try {
		yield put(globalActions.showLoading());
		const response = yield axios.get(`users/me/`);
		yield put(userActions.getCurrentUserSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

function* getUsersSaga() {
	try {
		yield put(globalActions.showLoading());
		const response = yield axios.get(`users/`);
		yield put(userActions.getUsersSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

function* updateUserSaga({ payload }) {
	try {
		yield put(globalActions.showLoading());
		const { formData } = payload;
		const userId = yield select(authSelectors.getUid);
		const response = yield axios.put(`users/${userId}/update/`, formData);
		yield put(userActions.updateUserSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

// Watcher
export default function* watchUserActions() {
	yield all([takeEvery(userActionTypes.GET_PROFILE, getProfileSaga)]);
	yield all([takeEvery(userActionTypes.GET_CURRENT_USER, getCurrentUserSaga)]);
	yield all([takeEvery(authActionTypes.LOGIN_SUCCESS, getCurrentUserSaga)]);
	yield all([takeEvery(userActionTypes.GET_USERS, getUsersSaga)]);
	yield all([takeEvery(userActionTypes.UPDATE_USER, updateUserSaga)]);
}
