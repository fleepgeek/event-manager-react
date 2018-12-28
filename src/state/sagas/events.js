import { put, takeEvery, all } from "redux-saga/effects";
import axios from "../../utils/axios-base";
import * as actions from "../events";

function* getEventsSaga(action) {
  yield put(actions.fetchEventsStart());
  try {
    const response = yield axios.get("event/");
    yield put(actions.fetchEventsSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchEventsFail(error));
  }
}

// Watcher
export default function* watchEventsActions() {
  yield all([takeEvery(actions.FETCH_EVENTS, getEventsSaga)]);
}
