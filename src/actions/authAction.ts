import axios from "axios";
import { returnErrors } from "./messagesAction";
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
  IRootState,
  DOMAIN,
} from "./types";
import { ConfigTypes, CredentialTypes } from "./types";
import { Dispatch } from "redux";

// Check the token and load user
export const loadUser = () => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  //User loadig
  dispatch({ type: USER_LOADING });

  axios
    .get(`http://${DOMAIN}/api/auth/user/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const login = (username: string, password: string) => (
  dispatch: Dispatch
) => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //request body
  const body = JSON.stringify({ username, password });

  axios
    .post(`http://${DOMAIN}/api/auth/login/`, body, config)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: LOGIN_FAIL });
    });
};

export const registerUser = ({
  username,
  password,
  email,
}: CredentialTypes) => (dispatch: Dispatch) => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //request body
  const body = JSON.stringify({ username, password, email });

  axios
    .post(`http://${DOMAIN}/api/auth/register/`, body, config)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: REGISTER_FAIL });
    });
};

export const logout = () => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  //User loadig
  dispatch({ type: USER_LOADING });
  console.log("hello");
  axios
    .post(`http://${DOMAIN}/api/auth/logout/`, null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const resetPassword = (email: string) => (dispatch: Dispatch) => {
  //User loadig
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email: email });
  dispatch({ type: RESET_PASSWORD_LOADING });
  axios
    .post(`http://${DOMAIN}/api/auth/request-reset-email/`, body, config)
    .then((res) => {
      dispatch({ type: PASSWORD_EMAIL_SENT });
      console.log(res.data);
      console.log(body);
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setNewPassword = (body: {
  password: string;
  uidb64: string;
  token: string;
}) => (dispatch: Dispatch) => {
  //User loadig
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({ type: RESET_PASSWORD_LOADING });
  axios
    .patch(`http://${DOMAIN}/api/auth/password-reset-complete/`, body, config)
    .then((res) => {
      dispatch({ type: PASSWORD_RESET_COMPLETE });
      console.log(res.data);
      console.log(body);
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
// const checkAuth = () => (dispatch, getState) => {};

export const tokenConfig = (getState: () => IRootState) => {
  const token = getState().auth.token;

  // headers
  const config: ConfigTypes = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //if token is present, add to header
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
