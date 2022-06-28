import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { LatLng } from "../TripDetails";

export default function GoogleMaps() {
  const latlng = useContext(LatLng);
  const [activeMarker, setActiveMarker] = useState(null);
  const [state, setState] = useState(null);
  useEffect(() => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng( latlng.pickupLat === "" ?  -37.8136 :latlng.pickupLat,latlng.pickupLng ===""? 144.9631 :latlng.pickupLng),
        destination: new window.google.maps.LatLng(latlng.dropoffLat ===""? -37.8116 :latlng.dropoffLat ,latlng.dropoffLng ===""? 145.23 : latlng.dropoffLng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setState(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [latlng.dropoffLng,latlng.pickupLat]);

 
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
   console.log(bounds)
  };

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      zoom={10}
      center={{lat:latlng.pickupLat === "" ?  -37.8136 :latlng.pickupLat,lng:latlng.pickupLng ===""? 144.9631 :latlng.pickupLng}}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "500px", height: "600px" }}
    >
      <DirectionsRenderer directions={state} />
    </GoogleMap>
  );
}
