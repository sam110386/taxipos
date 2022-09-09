import API from "../config/DiaAxios";
import { getHeader } from "./Api";


const path = {
  GET_CURRENT_TIME: "getCurrentDateTime",
  GET_TRIP_LIST: "tripList",
  GET_TRIP_DETAILS: "getTripDetails",
  GET_USER_SIGNATURE: "getMySignature",
  GET_VEHICLE_AGREEMENT: "getQuoteAgreement",
  BOOK_VEHICLE: "book",
  ADD_VEHICLE_TO_FAVOURITE: "addVehicleToWishlist",
  REMOVE_VEHICLE_TO_FAVOURITE: "removeWishlistVehicle",
  CREATE_TRIPE : "/createTrip",
  GET_FARE:"getfare",
  CANCEL_TRIP:"cancel",
  LOAD_CALLER_INFO_TRIPLOG :"load_caller_info_triplog",
  OPEN_TRIPS_TRIPLOG : "open_trips_triplog",
  TRIPLOG_CALLERID_POPUP :"triplog_callerid_popup",
  SEND_PUSH_NOTIFICATION_DIRECT:"send_push_notification_direct",
  EDIT_BOOKING:"editTrip"
};

export const loadCallerInfoTriplog = async (data) => {
  
  try {
    const res = await API.get(path.LOAD_CALLER_INFO_TRIPLOG, data);
    return res;
  } catch (err) {
    return null;
  }
};

export const telephoneverifyication = async (data) => {
  
  try {
    const res = await API.post(path.TRIPLOG_CALLERID_POPUP, data);
    return res;
  } catch (err) {
    return null;
  }
};


export const openTripsTriplog = async (data) => {
  try {
    const res = await API.post(path.OPEN_TRIPS_TRIPLOG, data);
    return res;
  } catch (err) {
    return null;
  }
};

export const getCurrentDateTime = async (data) => {
  try {
    const res = await API.get(path.GET_CURRENT_TIME, data);
    return res;
  } catch (err) {
    return null;
  }
};

export const getTriplist = async (data) => {
  try {
    const res = await API.post(path.GET_TRIP_LIST, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getFare = async (data) => {
  try {
    const res = await API.post(path.GET_FARE, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};


export const createTrip = async (data) => {
  try {
    const res = await API.post(path.CREATE_TRIPE, data, getHeader())
    return res;
  } catch (err) {
    return null;
  }
};

export const cancelTrip = async (data) => {
  try {
    const res = await API.post(path.CANCEL_TRIP, data, getHeader())
    return res;
  } catch (err) {
    return null;
  }
};



export const getTripDetails = async (data) => {
  try {
    const res = await API.post(path.GET_TRIP_DETAILS, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getVehicleQuote = async (data) => {
  try {
    const res = await API.post(path.GET_VEHICLE_QUOTES, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getUserSignature = async () => {
  try {
    const res = await API.get(path.GET_USER_SIGNATURE, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getVehicleAgreement = async (data) => {
  try {
    const res = await API.post(path.GET_VEHICLE_AGREEMENT, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const bookVehicle = async (data) => {
  try {
    const res = await API.post(path.BOOK_VEHICLE, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};
export const editBooking = async (data) => {
  try {
    const res = await API.post(path.EDIT_BOOKING, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};
export const sendPushNotification = async (data) => {
  try {
    const res = await API.post(path.SEND_PUSH_NOTIFICATION_DIRECT, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};
