import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useFormikContext } from "formik";
import { loader } from '../Triplog/CommonTriplog/GoogleMapAutoComplete';

const PickupAddress = ({ field, form, id,getPickupLatLng, ...props }) => {

    const [pickupAddress, setPickupAddress] = useState("");
    const [pickupLat, setPickupAddressLat] = useState("");
    const [pickupLng, setPickupAddressLng] = useState("");
    const { setFieldValue, getFieldMeta } = useFormikContext();
    const { name, value } = field;


    const getPickupAddress = async () => {
        var google = await loader.load()
        let autocomplete = new google.maps.places.Autocomplete((document.getElementById(id)), {
            types: ['geocode']
        });
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var placeorg = autocomplete.getPlace();
            setPickupAddress(placeorg.formatted_address)
            setPickupAddressLat(placeorg.geometry.location.lat())
            setPickupAddressLng(placeorg.geometry.location.lng())
        });
    }
    useEffect(() => {
        getPickupAddress();
    }, [])
 
    useEffect(() => {
        getPickupLatLng(pickupAddress,pickupLat,pickupLng)
        setFieldValue(name,pickupAddress)
    }, [pickupLng])

    return <input
        name={name}
        id={id}
        {...field}
        {...props}
    />;
};

export default PickupAddress;
