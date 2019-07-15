import { runSaga } from "redux-saga";

export async function recordSaga(saga, initialAction = {}) {
	const actions = [];

	await runSaga(
		{
			dispatch: action => actions.push(action)
		},
		saga,
		initialAction
	).done;

	return actions;
}
