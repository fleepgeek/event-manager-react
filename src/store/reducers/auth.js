import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    expirationDate: localStorage.getItem("expirationDate"),
    loading: false,
    error: null,
    isLogin: true,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                username: action.username,
                expiration_date: action.expiration_date
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                username: null,
                expirationDate: null,
            };
        case actionTypes.REG_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case actionTypes.TOGGLE_LOGIN:
            return {
                ...state,
                isLogin: !state.isLogin,
            }
        default:
            return state;
    }
};

export default reducer;
