import produce from "immer";
import globalActionTypes from "./actionTypes";

export const INITIAL_STATE = {
	loading: false,
	message: "",
	messageOpen: false
};

const globalReducer = (state = INITIAL_STATE, { type, payload }) =>
	produce(state, draft => {
		// eslint-disable-next-line default-case
		switch (type) {
			case globalActionTypes.SHOW_MESSAGE:
				draft.message = payload.message;
				draft.messageOpen = true;
				draft.loading = false;
				break;
			case globalActionTypes.HIDE_MESSAGE:
				draft.message = "";
				draft.messageOpen = false;
				break;
			case globalActionTypes.SHOW_LOADING:
				draft.loading = true;
				break;
			case globalActionTypes.HIDE_LOADING:
				draft.loading = false;
				break;
			case globalActionTypes.CLEAR_ALL:
				draft.loading = false;
				draft.message = "";
				draft.messageOpen = false;
				break;
		}
	});

export default globalReducer;
