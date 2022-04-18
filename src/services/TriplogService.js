import API from "../config/DiaAxios";
import { getHeader } from "./Api";
import { toast } from "react-hot-toast";

const path = {
  GET_CURRENT_TIME: "getCurrentDateTime",
  GET_TRIP_LIST: "tripList",
  GET_TRIP_DETAILS: "getTripDetails",
  GET_USER_SIGNATURE: "getMySignature",
  GET_VEHICLE_AGREEMENT: "getQuoteAgreement",
  BOOK_VEHICLE: "book",
  ADD_VEHICLE_TO_FAVOURITE: "addVehicleToWishlist",
  REMOVE_VEHICLE_TO_FAVOURITE: "removeWishlistVehicle",
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
    console.log("trip list",res);
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

export const addVehicleToFavourite = async (data) => {
  try {
    toast.loading("Adding to favourite");
    const res = await API.post(
      path.ADD_VEHICLE_TO_FAVOURITE,
      data,
      getHeader()
    );
    if (toast) toast.dismiss();
    if (res && res.status === 200) {
      if (res.data && res.data.status) {
        toast.success(res.data.message || "Added successfully !");
        return;
      }
      toast.error(res.data.message || "Failed to add to favourite.");
    }
  } catch (err) {
    if (toast) toast.dismiss();
    toast.error("Failed to add to favourite.");
  }
};
export const removeVehicleFromFavourite = async (data) => {
  try {
    toast.loading("Removing from favourite");
    const res = await API.post(
      path.REMOVE_VEHICLE_TO_FAVOURITE,
      data,
      getHeader()
    );
    if (toast) toast.dismiss();
    if (res && res.status === 200) {
      if (res.data && res.data.status) {
        toast.success(res.data.message || "Removed successfully !");
        return;
      }
      toast.error(res.data.message || "Failed to add to favourite.");
    }
  } catch (err) {
    if (toast) toast.dismiss();
    toast.error("Failed to add to favourite.");
  }
};
