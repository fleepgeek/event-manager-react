import {put} from "redux-saga/effects";
import axios from "../axios-base";
import * as actions from "../actions/index"


export function* getEventsSaga(action) {
    yield put(actions.fetchEventsStart());
    try {
        const response = yield axios.get("event/");
        yield put(actions.fetchEventsSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchEventsFail(error));
    }
}
