import { put, takeEvery, all } from "redux-saga/effects";
import axios from "../../utils/axios-base";
import * as eventActions from "./actions";
import * as globalActions from "../global/actions";
import actionTypes from "./actionTypes";

function* getAllEventsSaga(action) {
	yield put(globalActions.showLoading());
	try {
		const response = yield axios.get("events/");
		yield put(eventActions.fetchAllEventsSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(error.response.data.detail));
	}
}

function* getEventSaga({ payload }) {
	try {
		yield put(globalActions.showLoading());
		const response = yield axios.get(`events/${payload.id}/`);
		yield put(eventActions.fetchEventsByIdSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(error.response.data.detail));
	}
}

// function* attendEventSaga(action) {
// 	try {
// 		yield put(eventActions.attendEventInit());
// 		const response = yield axios.post(`events/${action.id}/attend/`);
// 		yield put(eventActions.attendEventSuccess(response.data));
// 	} catch (error) {
// 		yield put(eventActions.attendEventFail(error.response.data.detail));
// 	}
// }

// Watcher
export default function* watchEventActions() {
	yield all([takeEvery(actionTypes.FETCH_EVENT_BY_ID, getEventSaga)]);
	yield all([takeEvery(actionTypes.FETCH_ALL_EVENTS, getAllEventsSaga)]);
	// yield all([takeEvery(actionTypes.ATTEND_EVENT, attendEventSaga)]);
}
