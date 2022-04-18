import {
  START_CAR_LOADER,
  STOP_CAR_LOADER,
  GET_CAR_DETAILS,
  SAVE_RENT_TWON_CAR,
  REMOVE_RENT_TOWN_CAR,
  SAVE_CAR_QUOTE,
  REMOVE_CAR_QUOTE,
  SET_CAR_QUOTE_ERROR,
  REMOVE_CAR_QUOTE_ERROR,
} from "../actions/CarAction";

const initialState = {
  loading: false,
  carDetail: null,
  carQuote: null,
  carQuoteError: null,
};

const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_CAR_LOADER:
      return {
        ...state,
        loading: true,
      };
    case STOP_CAR_LOADER:
      return {
        ...state,
        loading: false,
      };
    case GET_CAR_DETAILS:
      return {
        ...state,
        carDetail: action.data,
      };
    case SAVE_RENT_TWON_CAR:
      return {
        ...state,
        rentTownCar: action.data,
      };
    case REMOVE_RENT_TOWN_CAR:
      return {
        ...state,
        rentTownCar: null,
      };
    case SAVE_CAR_QUOTE:
      return {
        ...state,
        carQuote: action.data,
      };
    case REMOVE_CAR_QUOTE:
      return {
        ...state,
        carQuote: null,
      };
    case SET_CAR_QUOTE_ERROR:
      return {
        ...state,
        carQuoteError: action.error,
      };
    case REMOVE_CAR_QUOTE_ERROR:
      return {
        ...state,
        carQuoteError: null,
      };
    default:
      return state;
  }
};

export default carReducer;
