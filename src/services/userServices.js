import API from "../config/DiaAxios";
import { getHeader } from "./Api";

const path = {
  SAVE_INCOME: "saveMonthlyIncome",
  PROVE_INCOME: "uploadPaystub",
  CHANGE_PASSWORD: "changePassword",
  UPDATE_PROFILE: "updateAccountDetails",
  SAVE_CARD: "addMyCard",
  LOAD_USER_DETAILS: "getmyaccountDetails",
  GET_ACTIVE_BOOKINGS: "getMyActiveLease",
  GET_PAST_BOOKINGS: "getMyPastBooking",
  GET_PENDING_BOOKINGS: "getMyPendingBooking",
  GET_ACTIVE_BOOKING_DETAIL: "getActiveBookingDetail",
  GET_PAST_BOOKING_DETAIL: "getPastBookingDetail",
  GET_PENDING_BOOKING_DETAIL: "getPendingBookingDetails",
  EXTEND_ACTIVE_BOOKING: "completebookedLease",
  GET_VEHICLE_INSPECTION_DOC: "getVehicleInspection",
  GET_VEHICLE_INSURANCE_DOC: "getinsurancetoken",
  GET_VEHICLE_REGISTRATION_DOC: "getVehicleRegistration",
  GET_VEHICLE_RENTAL_DOC: "getAgreement",
  CANCEL_BOOKING: "cancelbookedLease",
  UPDATE_LICENSE: "updateLicenseDetails",
  UPLOAD_LICENSE_DOCUMENT: "uploadDocument",
  GET_WISHLIST_VEHICLES: "getWishlistVehicle",
  REMOVE_WISHLIST_VEHICLE: "removeWishlistVehicle",
  GET_MYOFFERS: "getMyOffers",
  GET_VEHICLE_AGREEMENT: "quoteAgreement",
  GET_OFFER_QUOTE: "getOfferQuote",
  ACCEPT_OFFER: "acceptOffer",
  GET_TRANSACTIONS: "getMyTransactions",
  GET_MY_PAYMENT_METHODS: "getMyCards",
  SET_DEFAULT_PAYMENT_METHOD: "makeMyCardDefault",
  SEND_INVITES: "inviteFriend",
};

export const saveUserIncome = async (data) => {
  try {
    const res = await API.post(path.SAVE_INCOME, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const proveIncome = async () => {
  try {
    const res = await API.post(path.PROVE_INCOME, {}, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const changePassword = async (data) => {
  try {
    const res = await API.post(path.CHANGE_PASSWORD, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const updateUserProfile = async (data) => {
  try {
    const res = await API.post(path.UPDATE_PROFILE, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const saveUserCard = async (data) => {
  try {
    const res = await API.post(path.SAVE_CARD, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getUserDetails = async () => {
  try {
    const res = await API.post(path.LOAD_USER_DETAILS, {}, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getPendingBookings = async (data) => {
  try {
    const res = await API.post(path.GET_PENDING_BOOKINGS, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getActiveBookings = async (data) => {
  try {
    const res = await API.post(path.GET_ACTIVE_BOOKINGS, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getPastBookings = async (data) => {
  try {
    const res = await API.post(path.GET_PAST_BOOKINGS, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getPastBookingDetail = async (data) => {
  try {
    const res = await API.post(path.GET_PAST_BOOKING_DETAIL, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getActiveBookingDetail = async (data) => {
  try {
    const res = await API.post(
      path.GET_ACTIVE_BOOKING_DETAIL,
      data,
      getHeader()
    );
    return res;
  } catch (err) {
    return null;
  }
};

export const getPendingBookingDetail = async (data) => {
  try {
    const res = await API.post(
      path.GET_PENDING_BOOKING_DETAIL,
      data,
      getHeader()
    );
    return res;
  } catch (err) {
    return null;
  }
};

export const extendActiveBooking = async (data) => {
  try {
    const res = await API.post(path.EXTEND_ACTIVE_BOOKING, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getVehicleInspectionDoc = async (data) => {
  try {
    const res = await API.post(
      path.GET_VEHICLE_INSPECTION_DOC,
      data,
      getHeader()
    );
    return res;
  } catch (err) {
    return null;
  }
};

export const getVehicleInsuranceDoc = async (data) => {
  try {
    const res = await API.post(
      path.GET_VEHICLE_INSURANCE_DOC,
      data,
      getHeader()
    );
    return res;
  } catch (err) {
    return null;
  }
};

export const getVehicleRegistrationDoc = async (data) => {
  try {
    const res = await API.post(
      path.GET_VEHICLE_REGISTRATION_DOC,
      data,
      getHeader()
    );
    return res;
  } catch (err) {
    return null;
  }
};

export const getVehicleRentalAgreementDoc = async (data) => {
  try {
    const res = await API.post(path.GET_VEHICLE_RENTAL_DOC, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const cancelBooking = async (data) => {
  try {
    const res = await API.post(path.CANCEL_BOOKING, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const updateLicense = async (data) => {
  try {
    const res = await API.post(path.UPDATE_LICENSE, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const uploadLicenseDocument = async (data) => {
  try {
    const res = await API.post(path.UPLOAD_LICENSE_DOCUMENT, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const removeWishListVehicle = async (data) => {
  try {
    const res = await API.post(path.REMOVE_WISHLIST_VEHICLE, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getWishListVehicles = async (data) => {
  try {
    const res = await API.post(path.GET_WISHLIST_VEHICLES, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getMyOffers = async (data) => {
  try {
    const res = await API.post(path.GET_MYOFFERS, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getMyOfferVehicleAgreement = async (data) => {
  try {
    const res = await API.post(path.GET_VEHICLE_AGREEMENT, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getOfferQuote = async (data) => {
  try {
    const res = await API.post(path.GET_OFFER_QUOTE, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const acceptOffer = async (data) => {
  try {
    const res = await API.post(path.ACCEPT_OFFER, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getMyTransactions = async (data) => {
  try {
    const res = await API.post(path.GET_TRANSACTIONS, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const getMyPaymentMethods = async (data) => {
  try {
    const res = await API.post(path.GET_MY_PAYMENT_METHODS, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const setMyDefaultPaymentMethod = async (data) => {
  try {
    const res = await API.post(
      path.SET_DEFAULT_PAYMENT_METHOD,
      data,
      getHeader()
    );
    return res;
  } catch (err) {
    return null;
  }
};

export const inviteFiends = async (data) => {
  try {
    const res = await API.post(path.SEND_INVITES, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};
