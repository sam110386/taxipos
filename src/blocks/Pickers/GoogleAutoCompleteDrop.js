import Autocomplete from "react-google-autocomplete";
import React from "react";

function GoogleAutoCompleteDrop({getDropoffLatLng,dropoffaddress}) {
  return (
<>
<Autocomplete
className="google_auto_complete"
 placeholder={dropoffaddress}
style={{width:"500px"}}
apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
  onPlaceSelected={(place) => {
    getDropoffLatLng(place.geometry.location.lat(),place.geometry.location.lng());
  }}
/>
</>
  )
}

export default GoogleAutoCompleteDrop