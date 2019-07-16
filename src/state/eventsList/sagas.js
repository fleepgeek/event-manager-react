import { put, takeEvery, all } from "redux-saga/effects";
import axios from "../../utils/axios-base";
import * as eventsActions from "./actions";
import { globalActions } from "../global";
import { eventActions } from "../event";
import actionTypes from "./actionTypes";
import getHttpError from "../../utils/getHttpError";

export function* getAllEventsSaga(action) {
	yield put(globalActions.showLoading());
	try {
		const response = yield axios.get("events/");
		yield put(eventsActions.getAllEventsSuccess(response.data));
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

export function* getUserEventsSaga({ payload }) {
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

export function* saveEventSaga({ payload }) {
	yield put(globalActions.showLoading());
	const { id, formData } = payload;
	try {
		let response = null;
		if (id) {
			response = yield axios.put(`events/${id}/`, formData);
		} else {
			response = yield axios.post("events/", formData);
		}
		yield put(eventsActions.saveEventSuccess(response.data));
		yield put(globalActions.hideLoading());
		yield put(eventActions.getEventsByIdSuccess(response.data));
		yield put(globalActions.setRedirectPath(`/events/${response.data.id}`));
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

export function* deleteEventSaga({ payload }) {
	yield put(globalActions.showLoading());
	const { id } = payload;
	try {
		const response = yield axios.delete(`events/${id}/`);
		if (response.request.status === 204) {
			yield put(eventsActions.deleteEventSuccess(id));
		} else {
			yield put(globalActions.showMessage("Something went wrong!"));
		}
		yield put(globalActions.hideLoading());
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

export function* getCategoriesSaga(action) {
	try {
		const response = yield axios("events/categories");
		yield put(eventsActions.getCategoriesSuccess(response.data));
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

export function* getTagsSaga(action) {
	try {
		const response = yield axios("events/tags");
		yield put(eventsActions.getTagsSuccess(response.data));
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

// Watcher
export default function* watchEventsListActions() {
	yield all([takeEvery(actionTypes.GET_USER_EVENTS, getUserEventsSaga)]);
	yield all([takeEvery(actionTypes.GET_ALL_EVENTS, getAllEventsSaga)]);
	yield all([takeEvery(actionTypes.SAVE_EVENT, saveEventSaga)]);
	yield all([takeEvery(actionTypes.DELETE_EVENT, deleteEventSaga)]);
	yield all([takeEvery(actionTypes.GET_CATEGORIES, getCategoriesSaga)]);
	yield all([takeEvery(actionTypes.GET_TAGS, getTagsSaga)]);
}
