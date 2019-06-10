import produce from "immer";
import userActionTypes from "./actionTypes";

// Reducer
export const INITIAL_STATE = {
	event: {},
	profile: {}
};

const userReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case userActionTypes.GET_PROFILE_SUCCESS:
				draft.profile = payload.profile;
				break;
			case userActionTypes.GET_CREATED_EVENTS:
				draft.event.created = payload.events;
				break;
			case userActionTypes.GET_ATTENDING_EVENTS:
				draft.event.attending = payload.events;
				break;
		}
	});
// Notice that it is not needed to handle the default case,
// a producer that doesn't do anything will simply return the original state.

export default userReducer;
