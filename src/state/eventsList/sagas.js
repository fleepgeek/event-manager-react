import { put, takeEvery, all } from "redux-saga/effects";
import axios from "../../utils/axios-base";
import * as eventsActions from "./actions";
import * as globalActions from "../global/actions";
import actionTypes from "./actionTypes";
import getHttpError from "../../utils/getHttpError";

function* getAllEventsSaga(action) {
	yield put(globalActions.showLoading());
	try {
		const response = yield axios.get("events/");
		yield put(eventsActions.getAllEventsSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

function* getUserEventsSaga({ payload }) {
	try {
		yield put(globalActions.showLoading());
		const { userId } = payload;
		let endPoint = `users/${userId}/`;
		const [created, attending] = yield all([
			axios.get(endPoint + "events"),
			axios.get(endPoint + "attending")
		]);
		yield put(eventsActions.getUserEventsSuccess(created.data, attending.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

function* saveEventSaga({ payload }) {
	yield put(globalActions.showLoading());
	try {
		const response = yield axios.post("events/", payload.formData);
		yield put(eventsActions.saveEventSuccess(response.data));
		yield put(globalActions.hideLoading());
		yield put(globalActions.setRedirectPath(`/events/${response.data.id}`));
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

// Watcher
export default function* watchEventsListActions() {
	yield all([takeEvery(actionTypes.GET_USER_EVENTS, getUserEventsSaga)]);
	yield all([takeEvery(actionTypes.GET_ALL_EVENTS, getAllEventsSaga)]);
	yield all([takeEvery(actionTypes.SAVE_EVENT, saveEventSaga)]);
}
