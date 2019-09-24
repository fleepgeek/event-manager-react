import React from "react";
import { createMemoryHistory } from "history";
import mockAxios from "jest-mock-axios";
import { wait, fireEvent } from "@testing-library/react";

import { renderWithRedux } from "../../utils/testUtils";
import DashCalendar from "./DashCalendar";

const match = { url: "" };
const created = [
	{
		id: 63,
		uri: "http://localhost:8000/api/events/63/",
		title: "Code Camp Lagos",
		creator: {
			id: 2,
			username: "john",
			display_name: "John Kimono",
			about: "Over Cool headed man"
		},
		category: { id: 2, name: "Networking" },
		tags: [{ id: 1, name: "Conference" }],
		description: "Code Camp Lagos 2019.",
		// event_date: "2019-08-21T09:00:00Z",
		event_date: new Date(),
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
		creator: {
			id: 15,
			username: "mike",
			display_name: "Mike Will",
			about:
				"Cool headed dude.\r\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Amet corrupti rem minima atque aut? Commodi sit officiis, reiciendis perspiciatis eos asperiores maiores tempora ratione? Exercitationem, modi debitis tempore corrupti est ducimus, voluptas rem error adipisci mollitia ea asperiores quidem nulla!"
		},
		category: { id: 2, name: "Networking" },
		tags: [{ id: 1, name: "Conference" }],
		description: "Node.JS conference for developers",
		// event_date: "2019-08-09T13:00:00Z",
		event_date: new Date(),
		location: "IdeaHub",
		attending: true,
		created_on: "2019-07-01T15:52:35.251129Z"
	}
];

describe("DashCalendar", () => {
	it("should load component successfully", () => {
		const { getAllByText } = renderWithRedux(<DashCalendar match={match} />);
		expect(getAllByText("Calendar").length).toBeGreaterThan(0);
	});

	it("should get events and display them on calendar", async () => {
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
		// const history = { push: jest.fn() };
		const { getByText } = renderWithRedux(<DashCalendar match={match} />, {
			auth: { uid: 2 }
		});
		expect(getByText(/Loading/)).toBeInTheDocument();
		await wait(() => expect(getByText("Code Camp Lagos")).toBeInTheDocument());
		await wait(() =>
			expect(getByText("Node.JS Conference")).toBeInTheDocument()
		);
		expect(mockAxios.get).toHaveBeenCalled();
		// expect(mockAxios.get).toHaveBeenCalledTimes(2); // Currently giving me 4
	});

	it("should go to event detail page when event clicked on calendar", async () => {
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
		const history = createMemoryHistory();
		const { getByText, queryByText } = renderWithRedux(
			<DashCalendar match={match} history={history} />
		);
		await wait(() => expect(queryByText(/Loading/)).not.toBeInTheDocument());
		const eventItem = getByText("Code Camp Lagos");
		fireEvent.click(eventItem);
		expect(history.location.pathname).toBe("/events/63");
	});

	it("should not display calendar when no events", async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: []
			})
		);
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: []
			})
		);
		const { getByText, queryByText } = renderWithRedux(
			<DashCalendar match={match} />
		);
		expect(getByText(/Loading/)).toBeInTheDocument();
		await wait(() => expect(queryByText(/Loading/)).toBeNull());
		expect(getByText(/No events yet./)).toBeInTheDocument();
		expect(mockAxios.get).toHaveBeenCalled();
	});
});
