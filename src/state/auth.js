import { createActions, createReducer } from "reduxsauce";

// Actions
const { Types, Creators } = createActions(
  {
    auth: ["payload"],
    authStart: null,
    loginSuccess: ["token", "username", "expirationDate"],
    regSuccess: null,
    authFail: ["error"],
    logout: null,
    logoutSuccess: null,
    authAutoLogout: ["expirationDate"],
    authAutoLogin: ["token", "username", "expirationDate"],
    toggleLogin: null
  },
  { prefix: "[auth] " }
);

export const actionTypes = Types;
export const actions = Creators;

// Reducer
const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  expirationDate: localStorage.getItem("expirationDate"),
  loading: false,
  error: null,
  isLogin: true
};

export const authStart = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true
  };
};

export const loginSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    token: action.token,
    username: action.username,
    expiration_date: action.expiration_date
  };
};

export const authFail = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

export const logoutSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    token: null,
    username: null,
    expirationDate: null
  };
};

export const regSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false
  };
};

export const toggleLogin = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLogin: !state.isLogin
  };
};

const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_START]: authStart,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.AUTH_FAIL]: authFail,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.REG_SUCCESS]: regSuccess,
  [Types.TOGGLE_LOGIN]: toggleLogin
});

export default reducer;
