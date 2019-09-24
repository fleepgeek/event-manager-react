import React from "react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import mockAxios from "axios";
import { fireEvent, wait, waitForElement } from "@testing-library/react";

import { renderWithRedux } from "../../utils/testUtils";
import PrivateRoute from "../../routes/PrivateRoute";
import SaveEvent from "./SaveEvent";

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

const updatedEvent = event;
updatedEvent.title = "Flutter Conference";
updatedEvent.description = "Annual Flutter Conference";

describe("Save Event", () => {
	beforeEach(() => {
		// Categories
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: [{ id: 1, name: "Music" }, { id: 2, name: "Networking" }]
			})
		);
		// Tags
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: [{ id: 1, name: "Conference" }, { id: 2, name: "Spirituality" }]
			})
		);
	});

	it("should load component successfully", () => {
		const { getByText } = renderWithRedux(
			<SaveEvent
				location={{ pathname: "/event/create" }}
				match={{ path: "/event/create", params: {} }}
			/>
		);
		expect(getByText("Create Event")).toBeInTheDocument();
	});

	it("should create new event successfully", async () => {
		mockAxios.post.mockImplementation(() =>
			Promise.resolve({
				data: event
			})
		);
		const history = createMemoryHistory({
			initialEntries: ["/event/create"]
		});
		const { getByText, getByLabelText } = renderWithRedux(
			<Router history={history}>
				<PrivateRoute path="/event/create" component={SaveEvent} />
			</Router>,
			{
				auth: { token: "some.cool.token" }
			}
		);

		const categorySelect = await waitForElement(() =>
			getByLabelText(/category/i)
		);
		const tagsSelect = await waitForElement(() => getByLabelText(/tags/i));

		fireEvent.change(getByLabelText(/title/i), {
			target: { value: "Node.JS Conference" }
		});
		fireEvent.change(categorySelect, {
			target: { value: "2" }
		});
		fireEvent.change(getByLabelText(/description/i), {
			target: { value: "Annual Node.JS Conference" }
		});
		fireEvent.change(getByLabelText(/location/i), {
			target: { value: "CCHub" }
		});
		fireEvent.change(getByLabelText(/Event Date and Time/i), {
			target: { value: "2019-08-18T18:00:00" }
		});
		// Use userEvent from rtl
		tagsSelect.value = ["1"];
		fireEvent.change(tagsSelect);
		const saveBtn = getByText("Save Event");
		fireEvent.click(saveBtn);

		await wait(() => expect(mockAxios.post).toHaveBeenCalled());
		expect(history.location.pathname).toBe("/events/61");
	});

	it("should edit event successfully", async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: event
			})
		);
		mockAxios.put.mockImplementation(() =>
			Promise.resolve({
				data: updatedEvent
			})
		);
		const history = createMemoryHistory({
			initialEntries: ["/dashboard/events/61/edit"]
		});
		const { getByText, getByLabelText } = renderWithRedux(
			<Router history={history}>
				<PrivateRoute path="/dashboard/events/:id/edit" component={SaveEvent} />
			</Router>,
			{
				eventsList: { userEvents: { created: [event] } },
				auth: { token: "some.cool.token" }
			}
		);

		await wait(() => getByLabelText(/category/i));
		fireEvent.change(getByLabelText(/title/i), {
			target: { value: "Flutter Conference" }
		});
		fireEvent.change(getByLabelText(/description/i), {
			target: { value: "Annual Flutter Conference" }
		});
		const saveBtn = getByText("Save Event");
		fireEvent.click(saveBtn);

		await wait(() => expect(mockAxios.put).toHaveBeenCalled());
		expect(history.location.pathname).toBe("/events/61");
	});
});
