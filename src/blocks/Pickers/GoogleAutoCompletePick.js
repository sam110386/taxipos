import Autocomplete from "react-google-autocomplete";
import React from "react";

function GoogleAutoCompletePick({getPickUpLatLng,pickupaddress }) {
  return (
<>
<Autocomplete
className="google_auto_complete"
placeholder={pickupaddress}
style={{width:"500px"}}
  apiKey={store.getState().profile.googleplaceapikey === null? process.env.REACT_APP_GOOGLE_MAPS_API_KEY: store.getState().profile.googleplaceapikey}
  onPlaceSelected={(place) => {
    getPickUpLatLng(place.geometry.location.lat(),place.geometry.location.lng());
  }}
/>
</>
  )
}

export default GoogleAutoCompletePick