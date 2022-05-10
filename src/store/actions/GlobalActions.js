export const HIDE_LOGIN_MODAL = "HIDE_LOGIN_MODAL";
export const TOGGLE_LOGIN_MODAL = "TOGGLE_LOGIN_MODAL";
export const START_PAGE_LOADER = "START_PAGE_LOADER";
export const STOP_PAGE_LOADER = "STOP_PAGE_LOADER";
export const SHOW_INCOME_MODAL = "SHOW_INCOME_MODAL";
export const HIDE_INCOME_MODAL = "HIDE_INCOME_MODAL";
export const SHOW_CREDIT_CARD_MODAL = "SHOW_CREDIT_CARD_MODAL";
export const HIDE_CREDIT_CARD_MODAL = "HIDE_CREDIT_CARD_MODAL";
export const SHOW_DRIVING_LICENSE_MODAL = "SHOW_DRIVING_LICENSE_MODAL";
export const HIDE_DRIVING_LICENSE_MODAL = "HIDE_DRIVING_LICENSE_MODAL";


export const startPageLoader = () => ({
  type: "START_PAGE_LOADER",
});

export const stopPageLoader = () => ({
  type: "STOP_PAGE_LOADER",
});

export const hideLoginModal = () => ({
  type: "HIDE_LOGIN_MODAL",
  show: false,
});

export const toggleLoginModal = () => ({
  type: "TOGGLE_LOGIN_MODAL",
});

// Toggle Income Modal

export const showIncomeModal = () => ({
  type: SHOW_INCOME_MODAL,
  show: true,
});

export const hideIncomeModal = () => ({
  type: HIDE_INCOME_MODAL,
  show: false,
});

export const showCreditCardModal = () => ({
  type: SHOW_CREDIT_CARD_MODAL,
  show: true,
});

export const hideCreditCardModal = () => ({
  type: HIDE_CREDIT_CARD_MODAL,
  show: false,
});

export const showDrivingLicenseModal = () => ({
  type: SHOW_DRIVING_LICENSE_MODAL,
  show: true,
});

export const hideDrivingLicenseModal = () => ({
  type: HIDE_DRIVING_LICENSE_MODAL,
  show: false,
});



