import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import authReducer from "./auth";
import eventsListReducer from "./eventsList";
import eventReducer from "./event";
import watchAuthActions from "./auth/sagas";
import watchEventsListActions from "./eventsList/sagas";
import watchEventActions from "./event/sagas";
import globalReducer from "./global";
import userReducer from "./user";
import watchUserActions from "./user/sagas";

export function* rootSaga() {
	yield all([
		watchAuthActions(),
		watchEventsListActions(),
		watchEventActions(),
		watchUserActions()
	]);
}

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	eventsList: eventsListReducer,
	event: eventReducer,
	global: globalReducer
});

export default rootReducer;
