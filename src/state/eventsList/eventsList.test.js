import mockAxios from "axios";
import { recordSaga } from "../../utils/testUtils";
import eventsReducer, { eventsListActions } from "./";
import { globalActions } from "../global";
import { getAllEventsSaga, getUserEventsSaga, saveEventSaga } from "./sagas";

describe("getAllEventsSaga", () => {
	const event = {
		id: 1,
		title: "Some Event",
		description: "Some description"
	};
	const events = [event];

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should get the list of events successfully", async () => {
		mockAxios.get.mockImplementation(() =>
			Promise.resolve({
				data: events
			})
		);

		const actions = await recordSaga(getAllEventsSaga);
		// console.log(actions);
		expect.assertions(3);
		expect(actions[0].type).toEqual("[global] SHOW_LOADING");
		expect(actions).toContainEqual(
			eventsListActions.getAllEventsSuccess(events)
		);
		expect(actions).not.toContainEqual(globalActions.showMessage());
	});

	it("should return error getting the list of events ", async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				error: "Something went wrong"
			})
		);

		const actions = await recordSaga(getAllEventsSaga);
		expect.assertions(3);
		expect(actions[1].type).toEqual("[global] SHOW_MESSAGE");
		expect(actions).toContainEqual(globalActions.showMessage());
		expect(actions).not.toContainEqual(eventsListActions.getAllEventsSuccess());
	});

	it("should get User events success", async () => {
		mockAxios.get.mockImplementation(() =>
			Promise.resolve({
				data: events
			})
		);
		const actions = await recordSaga(
			getUserEventsSaga,
			eventsListActions.getUserEvents(1)
			// same as this but the above also passes the type
			// { payload: { userId: 1 } }
		);
		expect(actions).toContainEqual(
			eventsListActions.getUserEventsSuccess(events, events)
		);
		expect(actions).not.toContainEqual(globalActions.showMessage());
	});

	it("should return error getting User events", async () => {
		mockAxios.get.mockImplementation(() =>
			Promise.reject({
				error: { response: { data: { detail: "Something went wrong" } } }
			})
		);
		const actions = await recordSaga(
			getUserEventsSaga,
			eventsListActions.getUserEvents(1)
			// same as this but the above also passes the type
			// { payload: { userId: 1 } }
		);
		// console.log(actions);
		expect(actions).not.toContainEqual(
			eventsListActions.getUserEventsSuccess(events, events)
		);
		expect(actions).toContainEqual(globalActions.showMessage());
	});

	it("should create Event successfully", async () => {
		mockAxios.post.mockImplementation(() =>
			Promise.resolve({
				data: event
			})
		);
		mockAxios.put.mockImplementation(() =>
			Promise.resolve({
				data: event
			})
		);
		const actions = await recordSaga(
			saveEventSaga,
			eventsListActions.saveEvent(event)
		);
		expect(mockAxios.post).toBeCalled();
		expect(mockAxios.put).not.toBeCalled();
		expect(actions).toContainEqual(eventsListActions.saveEventSuccess(event));
		expect(actions).not.toContainEqual(globalActions.showMessage());
	});

	it("should update Event successfully", async () => {
		mockAxios.post.mockImplementation(() =>
			Promise.resolve({
				data: event
			})
		);
		mockAxios.put.mockImplementation(() =>
			Promise.resolve({
				data: event
			})
		);
		const actions = await recordSaga(
			saveEventSaga,
			eventsListActions.saveEvent(event, 1)
		);
		expect(mockAxios.put).toBeCalled();
		expect(mockAxios.post).not.toBeCalled();
		expect(actions).toContainEqual(eventsListActions.saveEventSuccess(event));
		expect(actions).not.toContainEqual(globalActions.showMessage());
	});

	it("should return error on save Event", async () => {
		mockAxios.post.mockImplementation(() =>
			Promise.reject({
				data: event
			})
		);
		const actions = await recordSaga(
			saveEventSaga,
			eventsListActions.saveEvent(event)
		);
		expect(actions).not.toContainEqual(
			eventsListActions.saveEventSuccess(event)
		);
		expect(actions).toContainEqual(globalActions.showMessage());
	});
});

// Reducer Tests
describe("eventsReducer", () => {
	const initialState = {
		all: [],
		userEvents: {},
		categories: [],
		tags: []
	};
	const events = [
		{
			id: 1,
			title: "Some Event",
			description: "Some description"
		}
	];

	it("should return the initial state", () => {
		const reducer = eventsReducer(undefined, {});
		expect(reducer).toEqual(initialState);
	});

	it("handles GET_ALL_EVENTS_SUCCESS as expected", () => {
		const reducer = eventsReducer(
			initialState,
			eventsListActions.getAllEventsSuccess(events)
		);
		expect(reducer).toEqual({
			all: events,
			userEvents: {},
			categories: [],
			tags: []
		});
	});

	it("handles GET_USER_EVENTS_SUCCESS as expected", () => {
		const reducer = eventsReducer(
			initialState,
			eventsListActions.getUserEventsSuccess(events, events)
		);
		expect(reducer).toEqual({
			all: [],
			userEvents: { created: events, attending: events },
			categories: [],
			tags: []
		});
	});
});
