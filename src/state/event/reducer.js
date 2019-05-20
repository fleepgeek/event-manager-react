import produce from "immer";
import eventActionTypes from "./actionTypes";

export const INITIAL_STATE = {
	single: {},
	all: []
};

const eventReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case eventActionTypes.FETCH_ALL_EVENTS_SUCCESS:
				draft.all = payload.events;
				break;
			case eventActionTypes.FETCH_EVENT_BY_ID_SUCCESS:
				draft.single = payload.event;
				break;
		}
	});

export default eventReducer;
