import { all } from "redux-saga/effects";
import watchEventsActions from "./eventList";
import watchAuthActions from "../auth/sagas";
import watchEventActions from "./event";

export default function* rootSaga() {
	yield all([watchAuthActions(), watchEventsActions(), watchEventActions()]);
}
