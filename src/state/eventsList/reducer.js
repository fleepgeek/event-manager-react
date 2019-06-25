import produce from "immer";
import eventsActionTypes from "./actionTypes";

export const INITIAL_STATE = {
	all: [],
	userEvents: {}
};

const eventsReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case eventsActionTypes.GET_ALL_EVENTS_SUCCESS:
				draft.all = payload.events;
				break;
			case eventsActionTypes.GET_USER_EVENTS_SUCCESS:
				draft.userEvents.created = payload.created;
				draft.userEvents.attending = payload.attending;
				break;
			case eventsActionTypes.SAVE_EVENT_SUCCESS:
				draft.all.push(payload.event);
				break;
		}
	});

export default eventsReducer;
