import React from "react";
import { BrowserRouter, MemoryRouter, Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import mockAxios from "jest-mock-axios";
import { fireEvent, wait, waitForElement } from "@testing-library/react";

import { renderWithRedux } from "../../utils/testUtils";
import DashPeople from "./DashPeople";
import { userSelectors } from "../../state/user";

const match = { url: "/dashboard/people", path: "/dashboard/people" };
const location = { pathname: "/dashboard/people" };

const profile = {
	id: 2,
	username: "john",
	email: "john@mail.com",
	display_name: "John Kimono",
	about: "Over Cool headed man"
};
const users = [profile];

const userEvents = [
	{
		id: 63,
		uri: "http://localhost:8000/api/events/63/",
		title: "Code Camp Lagos",
		creator: profile,
		category: { id: 2, name: "Networking" },
		tags: [{ id: 1, name: "Conference" }],
		description: "Code Camp Lagos 2019.",
		event_date: "2019-07-21T09:00:00Z",
		location: "IdeaHub",
		attending: false,
		created_on: "2019-07-01T16:05:40.334441Z"
	}
];

const attending = [
	{
		id: 61,
		uri: "http://localhost:8000/api/events/61/",
		title: "Node.JS Conference",
		creator: profile,
		category: { id: 2, name: "Networking" },
		tags: [{ id: 1, name: "Conference" }],
		description: "Node.JS conference for developers",
		event_date: "2019-07-09T13:00:00Z",
		location: "IdeaHub",
		attending: true,
		created_on: "2019-07-01T15:52:35.251129Z"
	}
];

describe("DashPeople", () => {
	it("should load component successfully", () => {
		jest.spyOn(React, "useEffect");
		const history = { replace: jest.fn() };
		const { getAllByText } = renderWithRedux(
			<DashPeople match={match} location={location} history={history} />
		);
		expect(getAllByText(/People/)[0]).toBeInTheDocument();
	});

	it("should display list of people successfully", async () => {
		mockAxios.get.mockImplementation(() =>
			Promise.resolve({
				data: users
			})
		);
		const history = createMemoryHistory({
			initialEntries: ["/dashboard/people"]
		});
		expect(history.location.pathname).toBe("/dashboard/people");
		const { getByText } = renderWithRedux(
			<Router history={history}>
				<Route path="/dashboard/people" component={DashPeople} />
				{/* <DashPeople match={match} history={history} location={location} /> */}
			</Router>
		);
		expect(getByText(/Loading/)).toBeInTheDocument();
		await wait(() => expect(getByText(/john/)).toBeInTheDocument());
		expect(history.location.pathname).toBe("/dashboard/people/list");
	});

	it("should display and hide modal with user data successfully", async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: users
			})
		);
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: profile
			})
		);
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: userEvents
			})
		);
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: attending
			})
		);
		const history = createMemoryHistory({
			initialEntries: ["/dashboard/people"]
		});
		const { getByText, getByTestId } = renderWithRedux(
			<>
				<div id="modal-root" />
				<Router history={history}>
					{/* Check why this doesnt work */}
					{/* <Route path="/dashboard/people" component={DashPeople} /> */}
					<DashPeople match={match} history={history} location={location} />
				</Router>
			</>
		);
		const user = await waitForElement(() => getByText(/john/));

		fireEvent.click(user);
		const modal = getByTestId("modal");
		expect(modal).toBeVisible();
		await wait(() => expect(getByText(/John Kimono/i)).toBeInTheDocument());

		// Hide modal
		fireEvent.click(getByTestId("backdrop"));
		expect(modal).not.toBeInTheDocument();
	});
});
