import {put} from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/index"

axios.defaults.baseURL = 'http://localhost:8000/api/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

export function* getEvents(action) {
    yield put(actions.fetchEventsStart);
    try {
        const response = yield axios.get("event/");
        yield put(actions.fetchEventsSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchEventsFail(error));
    }
}
