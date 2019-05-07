import { put, takeEvery, all } from "redux-saga/effects";
import axios from "../../utils/axios-base";
import * as actions from "./actions";
import actionTypes from "./actionTypes";

function* getAllEventsSaga(action) {
	yield put(actions.fetchEventStart());
	try {
		const response = yield axios.get("events/");
		yield put(actions.fetchAllEventsSuccess(response.data));
	} catch (error) {
		yield put(actions.fetchActionFailed(error.response.data.detail));
	}
}

function* getEventSaga({ payload }) {
	try {
		yield put(actions.fetchEventStart());
		const response = yield axios.get(`events/${payload.id}/`);
		yield put(actions.fetchEventsByIdSuccess(response.data));
	} catch (error) {
		yield put(actions.fetchActionFailed(error.response.data.detail));
	}
}

// function* attendEventSaga(action) {
// 	try {
// 		yield put(actions.attendEventInit());
// 		const response = yield axios.post(`events/${action.id}/attend/`);
// 		yield put(actions.attendEventSuccess(response.data));
// 	} catch (error) {
// 		yield put(actions.attendEventFail(error.response.data.detail));
// 	}
// }

// Watcher
export default function* watchEventActions() {
	yield all([takeEvery(actionTypes.FETCH_EVENT_BY_ID, getEventSaga)]);
	yield all([takeEvery(actionTypes.FETCH_ALL_EVENTS, getAllEventsSaga)]);
	// yield all([takeEvery(actionTypes.ATTEND_EVENT, attendEventSaga)]);
}
