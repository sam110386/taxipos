import { Loader } from 'google-maps';

export const loader = new Loader(`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`);