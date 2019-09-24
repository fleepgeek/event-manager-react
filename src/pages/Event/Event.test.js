import React from "react";
import mockAxios from "axios";
import { fireEvent, wait, waitForElement } from "@testing-library/react";

import { renderWithRedux } from "../../utils/testUtils";
import Event from "./Event";

const event = {
	id: 1,
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

const attendees = [
	{
		id: 75,
		user: {
			id: 2,
			username: "john",
			display_name: "John Kimono",
			about: "Over Cool headed man"
		},
		registered_on: "2019-07-17T15:28:45.371899Z"
	}
];

const match = {
	params: { id: 1 }
};

describe("Event Page", () => {
	beforeEach(() => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: event
			})
		);
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: attendees
			})
		);
	});

	test("should show event and attendees on success", async () => {
		const { getByText } = renderWithRedux(<Event match={match} />);
		expect(getByText(/Loading/u)).toBeInTheDocument();
		const eventTitle = await waitForElement(() =>
			getByText("Node.JS Conference")
		);
		expect(eventTitle).toBeInTheDocument();
		expect(getByText("john")).toBeInTheDocument();
		expect(() => getByText(/Loading/u)).toThrow();
	});

	test("should not show attend button when not logged in", async () => {
		const { getByText, getByTestId } = renderWithRedux(<Event match={match} />);
		await wait(() => getByText("Node.JS Conference"));
		expect(() => getByTestId("attend-button")).toThrow();
	});

	test("should show attend button when logged in", async () => {
		const { getByText, getByTestId } = renderWithRedux(
			<Event match={match} />,
			{
				auth: { token: "some-cool-token" }
			}
		);
		await wait(() => getByText("Node.JS Conference"));
		expect(getByTestId("attend-button")).toBeInTheDocument();
	});

	test("should not show attend button when logged in but is event creator", async () => {
		const { getByText, getByTestId } = renderWithRedux(
			<Event match={match} />,
			{
				auth: { token: "some-cool-token", uid: 15 }
			}
		);
		await wait(() => getByText("Node.JS Conference"));
		expect(() => getByTestId("attend-button")).toThrow();
	});

	test("should add or remove user when attend button clicked", async () => {
		mockAxios.post.mockImplementation(() =>
			Promise.resolve({
				data: {
					detail: ["You have successfully registered for this event"],
					attendee: {
						id: 76,
						user: {
							id: 3,
							username: "Sam",
							display_name: "Sammy Walsh",
							about: "Over Cool headed man"
						},
						registered_on: "2019-07-17T16:02:23.511938Z"
					}
				}
			})
		);
		mockAxios.delete.mockImplementation(() =>
			Promise.resolve({
				data: {
					detail: "You have successfully unregistered from this event",
					success: true
				}
			})
		);
		const { getByText, getByTestId } = renderWithRedux(
			<Event match={match} />,
			{
				auth: { token: "some-cool-token", uid: 3 }
			}
		);
		await wait(() => getByText("Node.JS Conference"));
		const attendBtn = getByTestId("attend-button");
		expect(attendBtn).toHaveTextContent("Attend");
		// Register
		fireEvent.click(attendBtn);
		const newAttendee = await waitForElement(() => getByText(/Sam/));
		expect(newAttendee).toBeInTheDocument();
		expect(attendBtn).toHaveTextContent("Cancel Attendance");
		// Unregister
		fireEvent.click(attendBtn);
		await wait(() => expect(newAttendee).not.toBeInTheDocument());
		expect(() => getByText(/Sam/)).toThrow();
	});
});
