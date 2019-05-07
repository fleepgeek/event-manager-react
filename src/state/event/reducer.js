import produce from "immer";
import eventActionTypes from "./actionTypes";

export const INITIAL_STATE = {
	single: {},
	all: [],
	loading: false,
	error: null
};

const eventReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case eventActionTypes.FETCH_EVENT_START:
				draft.loading = true;
				break;
			case eventActionTypes.FETCH_ALL_EVENTS_SUCCESS:
				draft.loading = false;
				draft.all = payload.events;
				break;
			case eventActionTypes.FETCH_EVENT_BY_ID_SUCCESS:
				draft.loading = false;
				draft.single = payload.event;
				break;
			case eventActionTypes.EVENT_ACTION_FAILED:
				draft.loading = false;
				draft.error = payload.error;
				break;
		}
	});

export default eventReducer;
