export const START_CAR_LOADER = "START_CAR_LOADER";
export const STOP_CAR_LOADER = "STOP_CAR_LOADER";
export const GET_CAR_DETAILS = "GET_CAR_DETAILS";
export const SAVE_RENT_TWON_CAR = "SAVE_RENT_TWON_CAR";
export const REMOVE_RENT_TOWN_CAR = "REMOVE_RENT_TOWN_CAR";
export const SAVE_CAR_QUOTE = "SAVE_CAR_QUOTE";
export const GET_CAR_QUOTE = "GET_CAR_QUOTE";
export const REMOVE_CAR_QUOTE = "REMOVE_CAR_QUOTE";
export const SET_CAR_QUOTE_ERROR = "SET_CAR_QUOTE_ERROR";
export const REMOVE_CAR_QUOTE_ERROR = "REMOVE_CAR_QUOTE_ERROR";

export const setCarDetails = (data) => {
  return {
    type: GET_CAR_DETAILS,
    data: data,
  };
};

export const setRentTownCar = (data) => {
  return {
    type: SAVE_RENT_TWON_CAR,
    data: data,
  };
};

export const removeRentTownCar = () => {
  return {
    type: REMOVE_RENT_TOWN_CAR,
  };
};

export const getCarQuote = (data) => {
  return {
    type: GET_CAR_QUOTE,
    data: data,
  };
};

export const setCarQuote = (data) => {
  return {
    type: SAVE_CAR_QUOTE,
    data: data,
  };
};

export const removeCarQuote = () => {
  return {
    type: REMOVE_CAR_QUOTE,
  };
};

export const setCarQuoteError = (error) => {
  return {
    type: SET_CAR_QUOTE_ERROR,
    data: error,
  };
};

export const removeCarQuoteError = () => {
  return {
    type: REMOVE_CAR_QUOTE_ERROR,
  };
};
