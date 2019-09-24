import React from "react";
import mockAxios from "axios";
import { waitForElement } from "@testing-library/react";

import { renderWithRedux } from "../../utils/testUtils";
import BrowseEvents from "./BrowseEvents";

const event = {
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
	category: {
		id: 2,
		name: "Networking"
	},
	tags: [
		{
			id: 1,
			name: "Conference"
		}
	],
	description: "Node.JS conference for developers",
	event_date: "2019-07-09T13:00:00Z",
	location: "IdeaHub",
	attending: false,
	created_on: "2019-07-01T15:52:35.251129Z"
};
const events = [event];

// beforeAll(() =>
// 	jest.spyOn(React, "useEffect").mockImplementation(React.useLayoutEffect)
// );
// afterAll(() => React.useEffect.mockRestore());

describe("BrowseEvents Page", () => {
	it("should display events on success", async () => {
		mockAxios.get.mockImplementation(() =>
			Promise.resolve({
				data: events
			})
		);
		const { getByText } = renderWithRedux(<BrowseEvents />);
		expect(getByText(/Events/u)).toBeInTheDocument();
		// expect(getByText(/Loading/u)).toBeInTheDocument();
		const titleText = await waitForElement(() =>
			getByText("Node.JS Conference")
		);
		// expect(() => getByText(/Loading/u)).toThrow();
		expect(titleText).toBeInTheDocument();
		expect(() => getByText(/Error Occured/u)).toThrow();
	});

	it("should display error message on fail", async () => {
		mockAxios.get.mockImplementation(() =>
			Promise.reject({
				response: { data: { detail: "Something Went Wrong!!" } }
			})
		);
		const { getByText } = renderWithRedux(<BrowseEvents />);
		expect(() => getByText(/Error Occured/u)).toThrow();
		const errorText = await waitForElement(() => getByText(/Error Occured/u));
		expect(errorText).toBeInTheDocument();
		expect(() => getByText("Node.JS Conference")).toThrow();
	});
});
