import React from "react";
import { BrowserRouter, MemoryRouter, Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import mockAxios from "jest-mock-axios";
import { fireEvent, wait, waitForElement } from "@testing-library/react";

import { renderWithRedux } from "../../utils/testUtils";
import DashSettings from "./DashSettings";
// import { userSelectors } from "../../state/user";

const match = { url: "/dashboard/settings", path: "/dashboard/settings" };
const location = { pathname: "/dashboard/settings" };
const history = { replace: jest.fn() };

const profile = {
	id: 2,
	username: "john",
	email: "john@mail.com",
	display_name: "John Kimono",
	about: "Over Cool headed man"
};

describe("DashSettings", () => {
	it("should render component successfully", () => {
		const { getAllByText } = renderWithRedux(
			<DashSettings match={match} location={location} history={history} />
		);
		expect(getAllByText(/setting/i)[0]).toBeInTheDocument();
	});
	describe("Profile", () => {
		it("should edit user profile successfully", async () => {
			mockAxios.put.mockImplementation(() =>
				Promise.resolve({
					data: {
						id: 2,
						username: "john",
						email: "john@mail.com",
						display_name: "John Kolobe",
						about: "I make sense die."
					}
				})
			);
			const history = createMemoryHistory({
				initialEntries: ["/dashboard/settings"]
			});
			const { getByText, getByLabelText, getByTestId } = renderWithRedux(
				<Router history={history}>
					<Route path="/dashboard/settings" component={DashSettings} />
				</Router>,
				{ user: { currentUser: profile } }
			);
			await wait(() =>
				expect(getByText(/public profile/i)).toBeInTheDocument()
			);
			const displayNameInput = getByLabelText(/display name/i);
			const aboutInput = getByLabelText(/about/i);
			expect(displayNameInput.value).toBe("John Kimono");
			expect(aboutInput.value).toBe("Over Cool headed man");
			// Update values and submit
			fireEvent.change(displayNameInput, {
				target: { value: "John Kolobe" }
			});
			fireEvent.change(aboutInput, {
				target: { value: "I make sense die." }
			});
			fireEvent.click(getByTestId(/update-btn/i));
			// Expect values to correspond with the returned values from server
			await wait(() => expect(displayNameInput.value).toBe("John Kolobe"));
			expect(aboutInput.value).toBe("I make sense die.");
		});
	});
});
