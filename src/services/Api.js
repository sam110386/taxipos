import { store } from "../store/store";


export const getHeader = () => {

  return {
    headers: {
      Authorization: `Basic ${store.getState().auth.auth_token}`,
    },
  };
};

