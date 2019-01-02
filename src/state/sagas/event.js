import { put, takeEvery, all } from "redux-saga/effects";
import axios from "../../utils/axios-base";
// import *  actions from "../events";
import { actionTypes, actions } from "../event";

function* getEventSaga(action) {
  console.log(action.id);
  yield put(actions.getEventStart());
  try {
    const response = yield axios.get(`events/${action.id}`);
    yield put(actions.getEventSuccess(response.data));
  } catch (error) {
    yield put(actions.getEventFail(error.response.data.detail));
  }
}

// Watcher
export default function* watchEventActions() {
  yield all([takeEvery(actionTypes.GET_EVENT, getEventSaga)]);
}