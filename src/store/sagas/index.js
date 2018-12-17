import { takeEvery } from "redux-saga/effects";
import { getEvents } from "./events";
import * as actionTypes from "../actions/actionTypes";

export function* watchEvents() {
    yield takeEvery(actionTypes.FETCH_EVENTS, getEvents);
}