import produce from "immer";
import eventActionTypes from "./actionTypes";

export const INITIAL_STATE = {
	all: []
};

const eventsReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case eventActionTypes.FETCH_ALL_EVENTS_SUCCESS:
				draft.all = payload.events;
				break;
		}
	});

export default eventsReducer;
