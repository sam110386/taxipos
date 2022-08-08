export const START_LOADER = "START_LOADER";
export const STOP_LOADER = "STOP_LOADER";
export const USER_LOGIN_MOBILE = "USER_LOGIN_MOBILE";
export const USER_LOGIN_PASSWORD = "USER_LOGIN_PASSWORD";
export const USER_REGISTRATION = "USER_REGISTRATION";
export const USER_VERIFY_OTP = "USER_VERIFY_OTP";
export const REGISTRATION_SUCSESS = "REGISTRATION_SUCSESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const SIGN_OUT = "SIGN_OUT";
export const UPDATE_USER_DETAIL = "UPDATE_USER_DETAIL";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";

export const loginSuccess = (token, data) => ({
  type: "LOGIN_SUCCESS",
  token: token,
  data: data,
});

export const registerSuccess = (token, data) => ({
  type: "REGISTER_SUCCESS",
  token: token,
  data: data,
});

export const updateUserDetail = (data) => ({
  type: "UPDATE_USER_DETAIL",
  data: data,
});

export const refreshUserToken = (token) => ({
  type: "REFRESH_TOKEN",
  token: token,
});

export const signOutUser = () => ({
  type: "SIGN_OUT",
});

export const setAuthError = (message) => ({
  type: "SET_AUTH_ERROR",
  message: message
});
