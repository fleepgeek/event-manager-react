import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import authReducer from "./auth";
import eventsReducer from "./events";
import eventReducer from "./event";
import watchAuthActions from "./auth/sagas";
import watchEventsActions from "./events/sagas";
import watchEventActions from "./event/sagas";
import globalReducer from "./global";
import userReducer from "./user";
import watchUserActions from "./user/sagas";

export function* rootSaga() {
	yield all([
		watchAuthActions(),
		watchEventsActions(),
		watchEventActions(),
		watchUserActions()
	]);
}

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	events: eventsReducer,
	event: eventReducer,
	global: globalReducer
});

export default rootReducer;
