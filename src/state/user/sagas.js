import { put, takeEvery, all } from "redux-saga/effects";
import userActionTypes from "./actionTypes";
import * as userActions from "./actions";
import * as globalActions from "../global/actions";
import axios from "../../utils/axios-base";

function* getProfileSaga({ payload }) {
	try {
		yield put(globalActions.showLoading());
		const { userId } = payload;
		const response = yield axios.get(`user/${userId}/`);
		yield put(userActions.getProfileSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(error.response.data.detail));
	}
}

function* getUserEventsSaga({ payload }) {
	try {
		yield put(globalActions.showLoading());
		const { userId } = payload;
		let endPoint = `user/${userId}/`;
		const [events, attending] = yield all([
			axios.get(endPoint + "events"),
			axios.get(endPoint + "attending")
		]);
		yield put(userActions.getCreatedEventsSuccess(events.data));
		yield put(userActions.getAttendingEventsSuccess(attending.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(error.response.data.detail));
	}
}

// Watcher
export default function* watchUserActions() {
	yield all([takeEvery(userActionTypes.GET_PROFILE, getProfileSaga)]);
	yield all([takeEvery(userActionTypes.GET_EVENTS, getUserEventsSaga)]);
}
