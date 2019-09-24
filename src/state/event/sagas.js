import { put, takeEvery, takeLeading, all, select } from "redux-saga/effects";
import axios from "../../utils/axios-base";
import * as eventActions from "./actions";
import * as globalActions from "../global/actions";
import actionTypes from "./actionTypes";
import getHttpError from "../../utils/getHttpError";

function* getEventSaga({ payload }) {
	try {
		yield put(globalActions.showLoading());
		const response = yield axios.get(`events/${payload.id}/`);
		yield put(eventActions.getEventsByIdSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

function* getAttendeesSaga({ payload }) {
	yield put(globalActions.showLoading());
	try {
		const response = yield axios.get(`events/${payload.eventId}/attendees/`);
		yield put(eventActions.getAttendeesSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

function* attendEventSaga({ type, payload }) {
	try {
		yield put(globalActions.showLoading());
		const state = yield select();
		const endPoint = `events/${payload.eventId}/attend/`;
		if (type === actionTypes.ATTEND_EVENT) {
			const response = yield axios.post(endPoint);
			yield put(eventActions.attendEventSuccess(response.data.attendee));
		} else if (type === actionTypes.CANCEL_ATTENDANCE) {
			yield axios.delete(endPoint);
			yield put(eventActions.cancelAttendanceSuccess(state.auth.uid));
		}
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

// Watcher
export default function* watchEventActions() {
	yield all([
		takeEvery(actionTypes.GET_EVENT_BY_ID, getEventSaga),
		takeEvery(actionTypes.GET_ATTENDEES, getAttendeesSaga),
		takeLeading(actionTypes.ATTEND_EVENT, attendEventSaga),
		takeLeading(actionTypes.CANCEL_ATTENDANCE, attendEventSaga)
	]);
}
