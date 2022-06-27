import { Loader } from "google-maps";
import { store } from "../../../store/store";

export const loader = new Loader(
  `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=${
    store.getState().profile.googleplaceapikey === null
      ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      : store.getState().profile.googleplaceapikey
  }&libraries=places`
);

