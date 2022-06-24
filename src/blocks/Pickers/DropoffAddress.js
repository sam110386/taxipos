import React from 'react'
import { useState, useEffect } from 'react'
import { useFormikContext } from "formik";
import { loader } from '../Triplog/CommonTriplog/GoogleMapAutoComplete';

const DropoffAddress = ({ field, form, id,getDropoffLatLng, ...props }) => {

    const [dropofAddress, setDropofAddress] = useState("");
    const [dropoffLat, setDropofAddressLat] = useState("");
    const [dropoffLng, setDropofAddressLng] = useState("");
   
    const { setFieldValue } = useFormikContext();
    const { name  } = field;
 

    const getDropOffAddress = async () => {
        let google = await loader.load()
        let autocomplete = new google.maps.places.Autocomplete((document.getElementById(id)), {
            types: ['geocode']
        });
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var placeorg = autocomplete.getPlace();
            setDropofAddressLat(placeorg.geometry.location.lat());
            setDropofAddress(placeorg.formatted_address);
            setDropofAddressLng(placeorg.geometry.location.lng());
        });
    }
    useEffect(() => {
        getDropOffAddress();
    }, [])
 
    useEffect(() => {
        getDropoffLatLng(dropoffLat,dropoffLng)
        setFieldValue(name,dropofAddress)
    }, [dropofAddress,dropoffLat,dropoffLng])

    return <input
        name={name}
        id={id}
        {...field}
        {...props}
    />;
};

export default DropoffAddress;
