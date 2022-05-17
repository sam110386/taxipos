import React from 'react'
import { useState, useEffect } from 'react'
import { useFormikContext } from "formik";
import { loader } from '../Triplog/CommonTriplog/GoogleMapAutoComplete';

const DropoffAddress = ({ field, form, id,getDropoffLatLng, ...props }) => {

    const [dropofAddressLat, setDropofAddressLat] = useState("");
    const [dropofAddressLng, setDropofAddressLng] = useState("");
    const [dropofAddress, setDropofAddress] = useState("");
    const { setFieldValue, getFieldMeta } = useFormikContext();
    const { name, value } = field;
 

    const getDropOffAddress = async () => {
        let google = await loader.load()
        let autocomplete = new google.maps.places.Autocomplete((document.getElementById(id)), {
            types: ['geocode']
        });
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var placeorg = autocomplete.getPlace();
            setDropofAddressLat(placeorg.geometry.location.lat());
            setDropofAddressLng(placeorg.geometry.location.lng());
            setDropofAddress(placeorg.formatted_address);
        });
    }
    useEffect(() => {
        getDropOffAddress();
    }, [])
 
    useEffect(() => {
        getDropoffLatLng(dropofAddressLat,dropofAddressLng)
        setFieldValue(name,dropofAddress)
    }, [dropofAddress,dropofAddressLat,dropofAddressLng])

    return <input
        name={name}
        id={id}
        {...field}
        {...props}
    />;
};

export default DropoffAddress;
