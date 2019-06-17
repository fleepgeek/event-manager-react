import produce from "immer";
import eventActionTypes from "./actionTypes";

export const INITIAL_STATE = {
	all: [],
	userEvents: {}
};

const eventsReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case eventActionTypes.GET_ALL_EVENTS_SUCCESS:
				draft.all = payload.events;
				break;
			case eventActionTypes.GET_USER_EVENTS_SUCCESS:
				draft.userEvents.created = payload.created;
				draft.userEvents.attending = payload.attending;
				break;
		}
	});

export default eventsReducer;
