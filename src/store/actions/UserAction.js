export const LOAD_USER_DETAILS = "LOAD_USER_DETAILS";
export const SAVE_USER_DETAILS = "SAVE_USER_DETAILS";
export const SAVE_OFFER_DETAILS = "SAVE_OFFER_DETAILS";
export const REMOVE_OFFER_DETAILS = "REMOVE_OFFER_DETAILS";

export const loadUserDetail = () => ({
  type: "LOAD_USER_DETAILS",
});

export const saveUserDetail = (data) => ({
  type: "SAVE_USER_DETAILS",
  data: data,
});

export const saveOfferDetail = (data) => ({
  type: SAVE_OFFER_DETAILS,
  data: data,
});

export const removeOfferDetail = () => ({
  type: REMOVE_OFFER_DETAILS,
});
