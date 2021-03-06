import API from "../config/DiaAxios";
import { getHeader } from "./Api";
import { toast } from "react-hot-toast";

const path = {
  GET_PRE_AUTH_CAR_DETAILS: "getPreAuthVehiclePriceDetail",
  GET_CAR_DETAILS: "getVehiclePriceDetail",
  GET_VEHICLE_QUOTES: "getVehicleQuote",
  GET_USER_SIGNATURE: "getMySignature",
  GET_VEHICLE_AGREEMENT: "getQuoteAgreement",
  BOOK_VEHICLE: "book",
  ADD_VEHICLE_TO_FAVOURITE: "addVehicleToWishlist",
  REMOVE_VEHICLE_TO_FAVOURITE: "removeWishlistVehicle",
  RE_ASSIGN_CAR: "dispatchertriplogs/opentripsroute",
  CAR_AUTOCOMPLETE: "car_autocomplete",
  CAR_ASSIGNMENT: "sent_push_notification_direct",
  REASSIGN_AFFILIATE:"reassign_affiliate_dispatch",
  GRAB_TRIP_DETAILS:"grabTripDetails"
};

export const getPreAuthCarDetails = async (data) => {
  try {
    const res = await API.post(path.GET_PRE_AUTH_CAR_DETAILS, data);
    return res;
  } catch (err) {
    return null;
  }
};

export const getCarDetails = async (data) => {
  try {
    const res = await API.post(path.GET_CAR_DETAILS, data, getHeader());
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

export const reassignCar = async (data) => {
  try {
    const res = await API.post(path.RE_ASSIGN_CAR, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
};

export const autoCompleteCar = async (data) => {
  try {
    const res = await API.post(path.CAR_AUTOCOMPLETE, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
}

export const carAssignment = async (data) => {
  try {
    const res = await API.post(path.CAR_ASSIGNMENT, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
}

export const reassignAffiliate = async (data)=>{
  try {
    const res = await API.post(path.REASSIGN_AFFILIATE, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
}

export const reloadTripDetails = async (data)=>{
  try {
    const res = await API.post(path.GRAB_TRIP_DETAILS, data, getHeader());
    return res;
  } catch (err) {
    return null;
  }
}

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
