import { put, takeEvery, all } from "redux-saga/effects";
import axios from "../../utils/axios-base";
// import *  actions from "../events";
import { actionTypes, actions } from "../eventList"

function* getEventsSaga(action) {
  yield put(actions.fetchEventsStart());
  try {
    const response = yield axios.get("events/");
    yield put(actions.fetchEventsSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchEventsFail(error));
  }
}

// Watcher
export default function* watchEventsActions() {
  yield all([takeEvery(actionTypes.FETCH_EVENTS, getEventsSaga)]);
}
