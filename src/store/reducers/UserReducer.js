import {
  SAVE_OFFER_DETAILS,
  REMOVE_OFFER_DETAILS,
} from "../actions/UserAction";

const initialState = {
  offerDetail: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_OFFER_DETAILS:
      return {
        ...state,
        offerDetail: action.data,
      };
    case REMOVE_OFFER_DETAILS:
      return {
        ...state,
        offerDetail: null,
      };
    default:
      return state;
  }
};

export default userReducer;
