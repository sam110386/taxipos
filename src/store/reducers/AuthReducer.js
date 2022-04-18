import {
  START_LOADER,
  STOP_LOADER,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  SIGN_OUT,
  REFRESH_TOKEN,
  UPDATE_USER_DETAIL,
  SET_AUTH_ERROR
} from "../actions/AuthAction";

import {SAVE_USER_DETAILS} from "../actions/UserAction";

const initialState = {
  loading: false,
  userLoggedIn: false,
  userDetails: null,
  auth_token: null,
  authError: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADER:
      return { ...state, loading: true };
    case STOP_LOADER:
      return { ...state, loading: false };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: action.data,
        auth_token: action.token,
        userLoggedIn: true,
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        loading: false,
        auth_token: action.token,
      };
    case UPDATE_USER_DETAIL:
    case SAVE_USER_DETAILS:
      return {
        ...state,
        loading: false,
        userDetails: action.data,
      };
    case SIGN_OUT:
      return {
        ...state,
        loading: false,
        userDetails: null,
        auth_token: null,
        userLoggedIn: false,
        authError:''
      };
    case SET_AUTH_ERROR:
      return {
        authError: action.message
      };
    default:
      return state;
  }
};
export default authReducer;
