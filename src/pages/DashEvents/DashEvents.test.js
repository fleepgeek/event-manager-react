import React from "react";
import mockAxios from "jest-mock-axios";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { wait, waitForElement, fireEvent } from "@testing-library/react";

import { renderWithRedux } from "../../utils/testUtils";
import DashEvents from "./DashEvents";

const match = { url: "/dashboard/events", path: "/dashboard/events" };
const location = { pathname: "/dashboard/events" };

const profile = {
	id: 2,
	username: "john",
	email: "john@mail.com",
	display_name: "John Kimono",
	about: "Over Cool headed man"
};

const created = [
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

describe("DashEvents", () => {
	it("should load component successfully", () => {
		const history = { replace: jest.fn() };
		const { getAllByText } = renderWithRedux(
			<DashEvents match={match} location={location} history={history} />
		);
		expect(getAllByText(/events/i)[0]).toBeInTheDocument();
	});

	it("should navigate to my events successfully", async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: created
			})
		);
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: attending
			})
		);
		const history = createMemoryHistory({
			initialEntries: ["/dashboard/events"]
		});
		const { getByText } = renderWithRedux(
			<Router history={history}>
				<Route path="/dashboard/events" component={DashEvents} />
			</Router>
		);
		expect(history.location.pathname).toBe("/dashboard/events/myevents");
		const title = await waitForElement(() => getByText(/Code Camp Lagos/i));
		expect(title).toBeInTheDocument();
	});

	it("should navigate to attending events successfully", async () => {
		const history = createMemoryHistory({
			initialEntries: ["/dashboard/events"]
		});
		const { getByText, store } = renderWithRedux(
			<Router history={history}>
				<Route path="/dashboard/events" component={DashEvents} />
			</Router>,
			{ eventsList: { userEvents: { attending } } }
		);
		fireEvent.click(getByText(/attending/i));
		expect(history.location.pathname).toBe("/dashboard/events/attending");
		await wait(() =>
			expect(getByText(/Node.JS Conference/i)).toBeInTheDocument()
		);
		// console.log(store.getState().eventsList.userEvents);
	});

	it("should delete my event successfully", async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: created
			})
		);
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: attending
			})
		);
		mockAxios.delete.mockImplementation(() =>
			Promise.resolve({
				status: 204
			})
		);
		const history = createMemoryHistory({
			initialEntries: ["/dashboard/events"]
		});
		const { getByText, queryByText } = renderWithRedux(
			<Router history={history}>
				<Route path="/dashboard/events" component={DashEvents} />
			</Router>
			// { eventsList: { userEvents: { created } } }
		);
		// jest.spyOn(React, "useEffect");
		const title = await waitForElement(() => getByText(/Code Camp Lagos/i));
		expect(title).toBeInTheDocument();
		const deleteEventBtn = getByText(/delete/i);

		fireEvent.click(deleteEventBtn);

		expect(mockAxios.delete).toHaveBeenCalled();
		expect(mockAxios.delete).toHaveBeenCalledWith("events/63/");
		await wait(() =>
			expect(queryByText(/Code Camp Lagos/i)).not.toBeInTheDocument()
		);
	});
});
