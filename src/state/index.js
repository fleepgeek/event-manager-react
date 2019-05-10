import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import authReducer from "./auth";
import eventReducer from "./event";
import watchAuthActions from "./auth/sagas";
import watchEventActions from "./event/sagas";

export function* rootSaga() {
	yield all([watchAuthActions(), watchEventActions()]);
}

const rootReducer = combineReducers({
	auth: authReducer,
	event: eventReducer
});

export default rootReducer;