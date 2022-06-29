import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";

// driveitaway_car.png
export default function GoogleMaps({ latlng, status }) {

  const [activeMarker, setActiveMarker] = useState(null);
  const [state, setState] = useState(null);
  const DirectionsService = new window.google.maps.DirectionsService();
  useEffect(() => {
    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(
          latlng.pickupLat === "" ? -37.8136 : parseFloat(latlng.pickupLat),
          latlng.pickupLng === "" ? 144.9631 : parseFloat(latlng.pickupLng)
        ),
        destination: new window.google.maps.LatLng(
          latlng.dropoffLat === "" ? -37.8116 : parseFloat(latlng.dropoffLat),
          latlng.dropoffLng === "" ? 145.23 : parseFloat(latlng.dropoffLng)
        ),
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
  }, [latlng.dropoffLng, latlng.pickupLat]);

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    console.log(bounds);
  };
  const center = {
    lat: latlng.pickupLat === "" ? 40.776676 : parseFloat(latlng.pickupLat),
    lng: latlng.pickupLng === "" ? -73.971321 : parseFloat(latlng.pickupLng),
  };

  let iconMarker = new window.google.maps.MarkerImage(
    "/images/driveitaway_car.png",
    null,
    null,
    null,
    new window.google.maps.Size(32, 32)
  );
  return (
    <>
     {status === undefined ?  <GoogleMap
        onLoad={handleOnLoad}
        zoom={10}
        center={center}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "530px", height: "650px" }}
      >
        {
          latlng.pickupLat === "" && latlng.dropoffLat === "" ? null : 
            <>
              <DirectionsRenderer directions={state} />
           
     
            </>
}
        
      </GoogleMap> :  <GoogleMap
        onLoad={handleOnLoad}
        zoom={10}
        center={center}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "530px", height: "650px" }}
      >
        {
          latlng.pickupLat === "" && latlng.dropoffLat === "" ? null : 
            <>
              <DirectionsRenderer directions={state} />
              <Marker
                position={{
                  lat:
                    latlng.pickupLat === ""
                      ? -37.8136
                      : parseFloat(latlng.pickupLat),
                  lng:
                    latlng.pickupLng === ""
                      ? 144.9631
                      : parseFloat(latlng.pickupLng),
                }}
                icon={iconMarker}
              />
     
            </>
}
        
      </GoogleMap>}
    </>
  );
}
// "/public/images/driveitaway_car.png"
