import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import mockAxios from "axios";
import { fireEvent, wait, waitForElement } from "@testing-library/react";

import { renderWithRedux } from "../../utils/testUtils";
import Auth from "./Auth";
import Logout from "./Logout";

const location = {
	state: { from: { pathname: "/" } }
};

describe("Auth", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("should mount component successfully", () => {
		const { getAllByText } = renderWithRedux(<Auth location={location} />);
		expect(getAllByText("Login")).toBeTruthy();
	});

	it("should successfully login user", async () => {
		const authResponse = {
			token: "eyJ.eyWlsTgzfQ.KMsl5Dkc",
			uid: 2,
			expires: "2019-07-25T12:26:23.523214Z"
		};
		mockAxios.post.mockImplementation(() =>
			Promise.resolve({
				data: authResponse
			})
		);
		const history = createMemoryHistory({ initialEntries: ["/auth"] });
		const { getByLabelText, getByTestId } = renderWithRedux(
			<Router history={history}>
				<Route component={Auth} />
			</Router>
		);
		// Would use this if we're rendering Auth via the Route because
		// we're using lazily loading the component
		// const submitBtn = await waitForElement(() => getByTestId("submit-button"));
		const submitBtn = getByTestId("submit-button");

		fireEvent.change(getByLabelText(/username/i), {
			target: { value: "john" }
		});
		fireEvent.change(getByLabelText(/password/i), {
			target: { value: "johnnypass" }
		});
		// expect(localStorage.getItem("token")).toBeNull();
		// expect(localStorage.getItem("uid")).toBeNull();
		fireEvent.click(submitBtn);

		await wait(() =>
			expect(mockAxios.post).toHaveBeenCalledWith("auth/", {
				username: "john",
				password: "johnnypass"
			})
		);
		expect(history.location.pathname).toBe("/");
		// expect(mockAxios.post).toHaveBeenCalled();
		// const token = localStorage.getItem("token");
		// expect(token).toEqual(authResponse.token);
		// expect(parseInt(localStorage.getItem("uid"))).toEqual(authResponse.uid);
		// debug();
		// console.log(store.getState().auth);
	});

	it("should successfully register user", async () => {
		const regResponse = {
			username: "Sammy",
			email: "sammy@mail.com",
			token: "eyJ0eNiJ9.eyfY5fQ.9cVyjz_U",
			message: "Registration Successful!"
		};
		mockAxios.post.mockImplementation(() =>
			Promise.resolve({
				data: regResponse
			})
		);
		const { getByLabelText, getByTestId } = renderWithRedux(
			<Auth location={location} />
		);
		const authToggleBtn = getByTestId("auth-toggle");
		fireEvent.click(authToggleBtn);
		fireEvent.change(getByLabelText(/username/i), {
			target: { value: "john" }
		});
		fireEvent.change(getByLabelText(/email/i), {
			target: { value: "john@mail.com" }
		});
		fireEvent.change(getByLabelText(/^password$/i), {
			target: { value: "johnnypass" }
		});
		fireEvent.change(getByLabelText(/re-type password/i), {
			target: { value: "johnnypass" }
		});
		expect(() => getByTestId("reg-success")).toThrow();
		const submitBtn = getByTestId("submit-button");
		fireEvent.click(submitBtn);
		await wait(() => expect(getByTestId("reg-success")).toBeInTheDocument());
		expect(mockAxios.post).toHaveBeenCalled();
	});

	it("should show error message on failed auth", async () => {
		mockAxios.post.mockImplementation(() =>
			Promise.reject({
				response: { data: { detail: "Invalid Credentials" } }
			})
		);
		const { getByLabelText, getByTestId, getByText } = renderWithRedux(
			<Auth location={location} />
		);
		fireEvent.change(getByLabelText(/username/i), {
			target: { value: "wronguser" }
		});
		fireEvent.change(getByLabelText(/password/i), {
			target: { value: "wrongpassword" }
		});
		const submitBtn = getByTestId("submit-button");
		fireEvent.click(submitBtn);
		const errorMessage = await waitForElement(() => getByText(/Error Occured/));
		expect(errorMessage).toBeInTheDocument();
	});

	it("should disable submit button on invalid form data", async () => {
		const { getByLabelText, getByTestId } = renderWithRedux(
			<Auth location={location} />
		);
		// min-length >== 4
		fireEvent.change(getByLabelText(/username/i), {
			target: { value: "wro" }
		});
		// min-length >== 8
		fireEvent.change(getByLabelText(/password/i), {
			target: { value: "wro" }
		});
		const submitBtn = getByTestId("submit-button");
		await wait(() => expect(submitBtn).toBeDisabled());
	});

	it("should toggle between login and registration auth fields", async () => {
		const { getByLabelText, getByTestId } = renderWithRedux(
			<Auth location={location} />
		);
		// Login Fields by default
		const authToggleBtn = getByTestId("auth-toggle");
		fireEvent.click(authToggleBtn);
		expect(getByLabelText(/email/i)).toBeInTheDocument();
		expect(getByLabelText(/re-type password/i)).toBeInTheDocument();
		fireEvent.click(authToggleBtn);
		expect(() => getByLabelText(/email/i)).toThrow();
		expect(() => getByLabelText(/re-type password/i)).toThrow();
	});

	describe("Logout", () => {
		it("should logout user successfully", async () => {
			const initialState = {
				auth: { token: "eyJ.eyWlsTgzfQ.KMsl5Dkc", uid: 2 }
			};
			localStorage.setItem("token", initialState.auth.token);
			localStorage.setItem("uid", initialState.auth.uid);
			// console.log(localStorage.getItem("token"));
			// const { store } = renderWithRedux(<Logout />, initialState);
			renderWithRedux(<Logout />, initialState);
			// console.log(store.getState().auth);
			expect(localStorage.getItem("token")).toBeNull();
			expect(localStorage.getItem("uid")).toBeNull();
		});
	});
});
