import React from "react";
import { render } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import createSagaMiddleware, { runSaga } from "redux-saga";
import { ThemeProvider } from "styled-components";

import rootReducer, { rootSaga } from "../state";
import theme from "../styles/theme";

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

export function renderWithRedux(ui, initialState = {}, renderFn = render) {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(sagaMiddleware)
	);
	sagaMiddleware.run(rootSaga);
	const obj = {
		...renderFn(
			<Provider store={store}>
				<MemoryRouter>
					<ThemeProvider theme={theme}>{ui}</ThemeProvider>
				</MemoryRouter>
			</Provider>
		),
		// adding `store` to the returned utilities to allow us
		// to reference it in our tests (just try to avoid using
		// this to test implementation details).
		store
	};
	obj.rerenderWithRedux = el => renderWithRedux(el, {}, obj.rerender);
	return obj;
}

// export function renderWithRedux(ui, initialState = {}) {
// 	const sagaMiddleware = createSagaMiddleware();
// 	const store = createStore(
// 		rootReducer,
// 		initialState,
// 		applyMiddleware(sagaMiddleware)
// 	);
// 	sagaMiddleware.run(rootSaga);
// 	return {
// 		...render(
// 			<Provider store={store}>
// 				<MemoryRouter>
// 					<ThemeProvider theme={theme}>{ui}</ThemeProvider>
// 				</MemoryRouter>
// 			</Provider>
// 		),
// 		// adding `store` to the returned utilities to allow us
// 		// to reference it in our tests (just try to avoid using
// 		// this to test implementation details).
// 		store
// 	};
// }
