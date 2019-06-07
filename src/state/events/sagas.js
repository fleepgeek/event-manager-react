import { put, takeEvery, all } from "redux-saga/effects";
import axios from "../../utils/axios-base";
import * as eventsActions from "./actions";
import * as globalActions from "../global/actions";
import actionTypes from "./actionTypes";

function* getAllEventsSaga(action) {
	yield put(globalActions.showLoading());
	try {
		const response = yield axios.get("events/");
		yield put(eventsActions.fetchAllEventsSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(error.response.data.detail));
	}
}

// Watcher
export default function* watchEventsActions() {
	yield all([takeEvery(actionTypes.FETCH_ALL_EVENTS, getAllEventsSaga)]);
}
