import {
  START_PAGE_LOADER,
  STOP_PAGE_LOADER,
  HIDE_LOGIN_MODAL,
  TOGGLE_LOGIN_MODAL,
  SHOW_INCOME_MODAL,
  HIDE_INCOME_MODAL,
  SHOW_CREDIT_CARD_MODAL,
  HIDE_CREDIT_CARD_MODAL,
  SHOW_DRIVING_LICENSE_MODAL,
  HIDE_DRIVING_LICENSE_MODAL,
} from "../actions/GlobalActions";

const initialState = {
  showLoginModal: false,
  showIncomeModal: false,
  showCreditCardModal: false,
  showDrivingLicenseModal: false,
  pageLoading: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_PAGE_LOADER:
      return {
        ...state,
        pageLoading: true,
      };
    case STOP_PAGE_LOADER:
      return {
        ...state,
        pageLoading: false,
      };
    case HIDE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: action.show,
      };
    case TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: !state.showLoginModal,
      };
    case SHOW_INCOME_MODAL:
    case HIDE_INCOME_MODAL:
      return {
        ...state,
        showIncomeModal: action.show,
      };
    case SHOW_CREDIT_CARD_MODAL:
    case HIDE_CREDIT_CARD_MODAL:
      return {
        ...state,
        showCreditCardModal: action.show,
      };
    case SHOW_DRIVING_LICENSE_MODAL:
    case HIDE_DRIVING_LICENSE_MODAL:
      return {
        ...state,
        showDrivingLicenseModal: action.show,
      };
    default:
      return state;
  }
};

export default globalReducer;
