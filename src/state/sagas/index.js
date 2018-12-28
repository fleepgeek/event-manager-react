import { all } from "redux-saga/effects";
import watchEventsActions from "./events";
import watchAuthActions from "./auth";

export default function* rootSaga() {
  yield all([watchAuthActions(), watchEventsActions()]);
}
