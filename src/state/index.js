import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import authReducer from "./auth";
import eventsReducer from "./events";
import eventReducer from "./event";
import watchAuthActions from "./auth/sagas";
import watchEventsActions from "./events/sagas";
import watchEventActions from "./event/sagas";
import globalReducer from "./global";

export function* rootSaga() {
	yield all([watchAuthActions(), watchEventsActions(), watchEventActions()]);
}

const rootReducer = combineReducers({
	auth: authReducer,
	events: eventsReducer,
	event: eventReducer,
	global: globalReducer
});

export default rootReducer;
