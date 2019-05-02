import { put, takeEvery, all } from "redux-saga/effects";
import axios from "../../utils/axios-base";
// import *  actions from "../events";
import { actionTypes, actions } from "../event";

function* getEventSaga(action) {
	try {
		yield put(actions.getEventStart());
		const response = yield axios.get(`events/${action.id}`);
		yield put(actions.getEventSuccess(response.data));
	} catch (error) {
		yield put(actions.getEventFail(error.response.data.detail));
	}
}

function* attendEventSaga(action) {
	try {
		yield put(actions.attendEventInit());
		const response = yield axios.post(`events/${action.id}/attend/`);
		yield put(actions.attendEventSuccess(response.data));
	} catch (error) {
		yield put(actions.attendEventFail(error.response.data.detail));
	}
}

// Watcher
export default function* watchEventActions() {
	yield all([takeEvery(actionTypes.GET_EVENT, getEventSaga)]);
	yield all([takeEvery(actionTypes.ATTEND_EVENT, attendEventSaga)]);
}
