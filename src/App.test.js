import React from "react";

import { renderWithRedux } from "./utils/testUtils";
import App from "./App";
import { wait } from "@testing-library/react";

describe("App", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("should load component successfully", async () => {
		const { getByText } = renderWithRedux(<App />);
		await wait(() => expect(getByText(/eventio/i)).toBeInTheDocument());
	});

	it("should not display auth only links ", () => {
		const { getByText } = renderWithRedux(<App />);
		expect(() => getByText(/dashboard/i)).toThrow();
	});

	it("should autoLogin if user token exists", () => {
		localStorage.setItem("token", "some.cool.token");
		localStorage.setItem("expirationDate", "2019-08-13T14:06:46.418886Z");
		localStorage.setItem("uid", "2");
		const { getByText } = renderWithRedux(<App />);
		expect(getByText(/dashboard/i)).toBeInTheDocument();
	});

	it("should not autoLogin if expirationDate has passed", () => {
		localStorage.setItem("token", "some.cool.token");
		localStorage.setItem("expirationDate", "2019-08-02T14:06:46.418886Z");
		localStorage.setItem("uid", "2");
		const { getByText } = renderWithRedux(<App />);
		expect(() => getByText(/dashboard/i)).toThrow();
	});

	it("should autoLogout if expirationTime has passed", async () => {
		jest.useFakeTimers();
		localStorage.setItem("token", "some.cool.token");
		localStorage.setItem("expirationDate", "2019-08-13T14:06:46.418886Z");
		localStorage.setItem("uid", "2");
		const { getByText } = renderWithRedux(<App />);

		jest.runAllTimers();

		await wait(() => expect(() => getByText(/dashboard/i)).toThrow());
		expect(() => getByText(/logout/i)).toThrow();
	});
});
