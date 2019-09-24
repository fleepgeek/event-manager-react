import React from "react";
import mockAxios from "jest-mock-axios";
import { fireEvent, waitForElement, wait } from "@testing-library/react";

import { renderWithRedux } from "../../utils/testUtils";
import UserProfile from "./UserProfile";

const profile = {
	id: 2,
	username: "john",
	email: "john@mail.com",
	display_name: "John Kimono",
	about: "Over Cool headed man"
};

const userEvents = [
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
		event_date: "2019-07-09T13:00:00Z",
		location: "IdeaHub",
		attending: true,
		created_on: "2019-07-01T15:52:35.251129Z"
	}
];

const match = { params: { id: "2" } };
describe("UserProfile", () => {
	it("should load component successfully", () => {
		const { getByText } = renderWithRedux(<UserProfile match={match} />);
		expect(getByText(/User Profile/)).toBeInTheDocument();
	});

	it("should display the user's profile", async () => {
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
		const { getByText } = renderWithRedux(<UserProfile match={match} />);
		expect(getByText(/Loading/)).toBeInTheDocument();
		await wait(() => expect(getByText(/john/)).toBeInTheDocument());
		await wait(() => expect(getByText(/Code Camp Lagos/)).toBeInTheDocument());
		await wait(() =>
			expect(getByText(/Node.JS Conference/)).toBeInTheDocument()
		);
	});

	it("should display error message on fail", async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				response: { data: { detail: "Not Found" } }
			})
		);
		const { getByText } = renderWithRedux(<UserProfile match={match} />);
		expect(getByText(/Loading/)).toBeInTheDocument();
		await wait(() => expect(getByText(/Error/)).toBeInTheDocument());
		expect(() => getByText(/Loading/)).toThrow();
	});
});
