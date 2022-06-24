import {
  PUBNUB_KEYS,
  GOOGLE_PLACE_API_KEY,
  REMOVE_ALL_KEYS,
} from "../actions/ProfileAction";

const initialState = {
  publishkey: null,
  subscribekey: null,
  secretkey: null,
  googleplaceapikey: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUBNUB_KEYS:
      return {
        ...state,
        publishkey: action.data.publishkey,
        subscribekey: action.data.subscribekey,
        secretkey: action.data.secretkey,
      };
    case GOOGLE_PLACE_API_KEY:
      return {
        ...state,
        googleplaceapikey: action.data,
      };
    case REMOVE_ALL_KEYS:
      return {
        ...state,
        publishkey: null,
        subscribekey: null,
        secretkey: null,
        googleplaceapikey: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
