import { createActions, createReducer } from "reduxsauce";

// Actions
const { Types, Creators } = createActions(
	{
		getEvent: ["id"],
		getEventStart: null,
		getEventSuccess: ["event"],
		getEventFail: ["error"],
		attendEvent: ["id"],
		attendEventInit: null,
		attendEventSuccess: ["attendMsg"],
		attendEventFail: ["error"]
	},
	{ prefix: "[event] " }
);

export const actionTypes = Types;
export const actions = Creators;

// console.log(Types)
// console.log(Creators)

// Reducer
const INITIAL_STATE = {
	id: null,
	event: {},
	loading: false,
	error: null,
	attendLoading: false
};

export const getEventStart = (state = INITIAL_STATE) => ({
	...state,
	loading: true
});

export const getEventSuccess = (state = INITIAL_STATE, action) => ({
	...state,
	loading: false,
	event: action.event
});

export const getEventFail = (state = INITIAL_STATE, action) => ({
	...state,
	loading: false,
	error: action.error
});

export const attendEventInit = (state = INITIAL_STATE) => ({
	...state,
	attendLoading: true
});

export const attendEventSuccess = (state = INITIAL_STATE, action) => ({
	...state,
	attendLoading: false,
	attendMsg: action.attendMsg
});

export const attendEventFail = (state = INITIAL_STATE, action) => ({
	...state,
	attendLoading: false,
	error: action.error
});

const reducer = createReducer(INITIAL_STATE, {
	[Types.GET_EVENT_START]: getEventStart,
	[Types.GET_EVENT_SUCCESS]: getEventSuccess,
	[Types.GET_EVENT_FAIL]: getEventFail,
	[Types.ATTEND_EVENT_INIT]: attendEventInit,
	[Types.ATTEND_EVENT_SUCCESS]: attendEventSuccess,
	[Types.ATTEND_EVENT_FAIL]: attendEventFail
});

export default reducer;
