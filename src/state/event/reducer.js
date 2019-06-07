import produce from "immer";
import eventActionTypes from "./actionTypes";

export const INITIAL_STATE = {
	event: {},
	attendees: []
};

const eventReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case eventActionTypes.FETCH_EVENT_BY_ID_SUCCESS:
				draft.event = payload.event;
				break;
			case eventActionTypes.GET_ATTENDEES_SUCCESS:
				draft.attendees = payload.attendees;
				break;
			case eventActionTypes.ATTEND_EVENT_SUCCESS:
				draft.loading = false;
				draft.event.attending = true;
				draft.attendees.push(payload.attendee);
				break;
			case eventActionTypes.CANCEL_ATTENDANCE_SUCCESS:
				draft.loading = false;
				draft.event.attending = false;
				draft.attendees.splice(
					draft.attendees.findIndex(atd => atd.user.id === payload.userId),
					1
				);
				break;
			case eventActionTypes.EVENT_PAGE_UNLOADED:
				return {};
		}
	});

export default eventReducer;
