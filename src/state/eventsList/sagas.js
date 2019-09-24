import { put, takeEvery, takeLeading, all } from "redux-saga/effects";
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
			axios.get(endPoint + "events/"),
			axios.get(endPoint + "attending/")
		]);
		// const created = yield axios.get(endPoint + "events");
		// const attending = yield axios.get(endPoint + "attending");
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
			yield put(eventsActions.updateEventSuccess(response.data));
		} else {
			response = yield axios.post("events/", formData);
			yield put(eventsActions.createEventSuccess(response.data));
		}
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
		if (response.status === 204) {
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
		const response = yield axios.get("events/categories");
		yield put(eventsActions.getCategoriesSuccess(response.data));
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

export function* getTagsSaga(action) {
	try {
		const response = yield axios.get("events/tags");
		yield put(eventsActions.getTagsSuccess(response.data));
	} catch (error) {
		yield put(globalActions.showMessage(getHttpError(error)));
	}
}

// Watcher
export default function* watchEventsListActions() {
	yield all([
		takeEvery(actionTypes.GET_USER_EVENTS, getUserEventsSaga),
		takeEvery(actionTypes.GET_ALL_EVENTS, getAllEventsSaga),
		takeLeading(actionTypes.SAVE_EVENT, saveEventSaga),
		takeLeading(actionTypes.DELETE_EVENT, deleteEventSaga),
		takeLeading(actionTypes.GET_CATEGORIES, getCategoriesSaga),
		takeLeading(actionTypes.GET_TAGS, getTagsSaga)
	]);
}
