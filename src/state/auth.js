// Actions
export const AUTH = "[auth] AUTH";
export const AUTH_START = "[auth] AUTH_START";
export const AUTH_FAIL = "[auth] AUTH_FAIL";
export const LOGIN_SUCCESS = "[auth] LOGIN_SUCCESS";
export const LOGOUT_START = "[auth] LOGOUT_START";
export const LOGOUT_SUCCESS = "[auth] LOGOUT_SUCCESS";
export const REG_SUCCESS = "[auth] REG_SUCCESS";
export const AUTH_AUTO_LOGOUT = "[auth] AUTH_AUTO_LOGOUT";
export const AUTH_AUTO_LOGIN = "[auth] AUTH_AUTO_LOGIN";
export const TOGGLE_LOGIN = "[auth] TOGGLE_LOGIN";

// Action Creators
export const auth = payload => ({
  type: AUTH,
  payload
  // username,
  // password,
});

export const authStart = () => ({
  type: AUTH_START
});

export const loginSuccess = (token, username, expirationDate) => ({
  type: LOGIN_SUCCESS,
  token,
  username,
  expirationDate
});

export const regSuccess = () => ({
  type: REG_SUCCESS
});

export const authFail = error => ({
  type: AUTH_FAIL,
  error
});

export const logout = () => ({
  type: LOGOUT_START
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const authAutoLogout = expirationDate => ({
  type: AUTH_AUTO_LOGOUT,
  expirationDate
});

export const authAutoLogin = (token, username, expirationDate) => ({
  type: AUTH_AUTO_LOGIN,
  token,
  username,
  expirationDate
});

export const toggleLogin = () => ({
  type: TOGGLE_LOGIN
});

// Reducer
const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  expirationDate: localStorage.getItem("expirationDate"),
  loading: false,
  error: null,
  isLogin: true
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token,
        username: action.username,
        expiration_date: action.expiration_date
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        username: null,
        expirationDate: null
      };
    case REG_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case TOGGLE_LOGIN:
      return {
        ...state,
        isLogin: !state.isLogin
      };
    default:
      return state;
  }
};

export default reducer;
