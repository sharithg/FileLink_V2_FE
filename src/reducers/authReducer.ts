import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_EMAIL_SENT,
  PASSWORD_RESET_COMPLETE,
  RESET_PASSWORD_LOADING,
  IAuthState,
  IActionAuth,
} from "../actions/types";

const initialState: IAuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  isResetLoading: false,
  user: null,
  password_email_sent: false,
  new_password_set: false,
};

function authReducer(state = initialState, action: IActionAuth): IAuthState {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case PASSWORD_EMAIL_SENT:
      return {
        ...state,
        password_email_sent: true,
        isResetLoading: false,
      };
    case PASSWORD_RESET_COMPLETE:
      return {
        ...state,
        new_password_set: true,
        isResetLoading: false,
      };
    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        isResetLoading: true,
      };
    default:
      return state;
  }
}

export default authReducer;
