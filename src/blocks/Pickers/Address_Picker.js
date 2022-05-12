import { Loader, LoaderOptions } from 'google-maps';
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Field } from 'formik';


const Address_Picker = () => {
    const formikRef = useRef();
    const [pickupAddress, setPickupAddress] = useState("");
    const [dropofAddress, setDropofAddress] = useState("");
    const [pickupAddressLat, setPickupAddressLat] = useState("");
    const [pickupAddressLng, setPickupAddressLng] = useState("");
    const [dropofAddressLat, setDropofAddressLat] = useState("");
    const [dropofAddressLng, setDropofAddressLng] = useState("");


    useEffect(() => {
        if (formikRef.current) {
            formikRef.current.setFieldValue(
                "pickup_address",
                pickupAddress,
            );
            formikRef.current.setFieldValue(
                "pickup_lat",
                pickupAddressLat
            );
            formikRef.current.setFieldValue(
                "pickup_lng",
                pickupAddressLng
            );
           
        }
    }, [pickupAddress])

    const loader = new Loader(`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`);

    const getDropOffAddress = async () => {
        let google = await loader.load()
        let autocomplete = new google.maps.places.Autocomplete((document.getElementById("dropofaddress")), {
            types: ['geocode']
        });
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var placeorg = autocomplete.getPlace();
            setDropofAddressLat(placeorg.geometry.location.lat());
            setDropofAddressLng(placeorg.geometry.location.lng());
            setDropofAddress(placeorg.formatted_address);
        });
    }

    const getPickupAddress = async () => {
        var google = await loader.load()
        let autocomplete = new google.maps.places.Autocomplete((document.getElementById("pickupaddress")), {
            types: ['geocode']
        });
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var placeorg = autocomplete.getPlace();
            setPickupAddressLat(placeorg.geometry.location.lat())
            setPickupAddressLng(placeorg.geometry.location.lng())
            setPickupAddress(placeorg.formatted_address)
        });
    }
    useEffect(() => {
        getPickupAddress();
        getDropOffAddress();
    }, [1])

    return (
        <>
            <Field
                id="pickupaddress"
                placeholder="Pick-up-Address"
                name="pickup_address"
                autocomplete="off"
                className={`form-control `}
            />
        </>
    )

}


export default Address_Picker