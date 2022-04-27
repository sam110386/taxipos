import React, { useEffect, useState, useRef } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { FullPageLoader } from "../Loaders";
import { Button } from "@material-ui/core";
import * as TriplogServices from '../../services/TriplogService';
import moment from "moment";


const TripDetails = (props) => {

    const formikRef = useRef();

    const TriplogSchema = Yup.object().shape({
        pickup_address: Yup.string().required("Please enter Pickup-Address"),
        dropoff_address: Yup.string().required("Please enter Drop-Off-Address"),
        account_no: Yup.number().min(4),
        telephone: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Telephone number is not valid'),
        fare: Yup.number("Please Enter Currect Fare")
    });

  
    const [CurrentPickupTime, setCurrentPickupTime] = useState(0);
    const [CurrentDate, setCurrentDate] = useState(0);
    const [Triplist, setTriplist] = useState([]);
    const [pickupAddress, setPickupAddress] = useState("");
    const [pickupAddressLat, setPickupAddressLat] = useState("");
    const [pickupAddressLng, setPickupAddressLng] = useState("");
    const [pickupAddress2, setPickupAddress2] = useState("");
    const [dropofAddress, setDropofAddress] = useState("");
    const [dropofAddressLat, setDropofAddressLat] = useState("");
    const [dropofAddressLng, setDropofAddressLng] = useState("");
    const [dropofAddress2, setDropofAddress2] = useState("");


    const { user, userDetails } = useSelector((state) => {
        return {
            user: state.auth,
            userDetails: state.auth.userDetails
        };
    });


    const initiaal_Values = {
        isNew: "",
        dropoff_cross_street: "",
        pickup_cross_street: "",
        dispatchTime: "",
        share: "",
        // multidayrange: [],
        multidays: [],
        device_id: "",
        pickup_date: "",
        pickup_time: "",
        pickup_address: "",
        pickup_address2: "",
        dropoff_address: "",
        dropoff_address2: "",
        car_no: "",
        cab_name: "",
        telephone: "",
        amt_of_passengers: "",
        passenger_name: "",
        fare: "",
        tip: "",
        toll: "",
        stops: "",
        misc: "",
        wait_time: "",
        details: "",
        account_no: "",
        voucher_no: "",
        direct_notification_time: "",
        pickup_lat: "",
        pickup_lng: "",
        dropoff_lat: "",
        dropoff_lng: "",
        roundtrip: "",
    }

    const getDropOffAddress = () => {
        var autocomplete1 = new window.google.maps.places.Autocomplete((document.getElementById("dropofaddressid")), {
            types: ['geocode']
        });

        window.google.maps.event.addListener(autocomplete1, 'place_changed', function () {
            var placeorg = autocomplete1.getPlace();
            setDropofAddressLat(placeorg.geometry.location.lat())
            setDropofAddressLng(placeorg.geometry.location.lng())
            setDropofAddress(placeorg.formatted_address)
        });

        var autocomplete2 = new window.google.maps.places.Autocomplete((document.getElementById("dropofaddressid2")), {
            types: ['geocode']
        });

        window.google.maps.event.addListener(autocomplete2, 'place_changed', function () {
            var placeorg = autocomplete2.getPlace();
            setDropofAddress2(placeorg.formatted_address)
        });
    }


    const getPickupAddress = () => {
        var autocomplete1 = new window.google.maps.places.Autocomplete((document.getElementById("pickupaddressid")), {
            types: ['geocode']
        });

        window.google.maps.event.addListener(autocomplete1, 'place_changed', function () {
            var placeorg = autocomplete1.getPlace();
            setPickupAddressLat(placeorg.geometry.location.lat())
            setPickupAddressLng(placeorg.geometry.location.lng())
            setPickupAddress(placeorg.formatted_address)
        });

        var autocomplete2 = new window.google.maps.places.Autocomplete((document.getElementById("pickupaddressid2")), {
            types: ['geocode']
        });

        window.google.maps.event.addListener(autocomplete2, 'place_changed', function () {
            var placeorg = autocomplete2.getPlace();
            setPickupAddress2(placeorg.formatted_address)
        });
    }


    useEffect(() => {
        getPickupAddress()
        getDropOffAddress()
    }, [])

    useEffect(() => {
        formikRef.current.setFieldValue(
            "pickup_time",
            CurrentPickupTime
        );
        formikRef.current.setFieldValue(
            "pickup_date",
            CurrentDate
        );
    }, [CurrentPickupTime, CurrentDate]);

    useEffect(() => {
        if (formikRef.current) {
            formikRef.current.setFieldValue(
                "pickup_address",
                pickupAddress,
            );
            formikRef.current.setFieldValue(
                "pickup_address2",
                pickupAddress2
            );
            formikRef.current.setFieldValue(
                "pickup_lat",
                pickupAddressLat
            );
            formikRef.current.setFieldValue(
                "pickup_lng",
                pickupAddressLng
            );
            formikRef.current.setFieldValue(
                "dropoff_address",
                dropofAddress
            );
            formikRef.current.setFieldValue(
                "dropoff_lat",
                dropofAddressLat
            );
            formikRef.current.setFieldValue(
                "dropoff_lng",
                dropofAddressLng
            );
            formikRef.current.setFieldValue(
                "dropoff_address2",
                dropofAddress2
            );

        }

    }, [pickupAddress, dropofAddress, dropofAddress2, pickupAddress2])




    const handleSubmit = (values) => {
        console.log("submit")
        console.log(values)
    }
    const fareEstimate = () => {

    }
    const getFare = () => {

    }

    const onError = (message) => {
        //setError(true);
    };



    const initialize = () => {
        updateCurrentTime();
        loadTripList();
    }
    const updateCurrentTime = async () => {
        try {
            const res = await TriplogServices.getCurrentDateTime();
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                    setCurrentPickupTime(res.data.time);
                    setCurrentDate(res.data.date);
                    let currentTime = moment(res.data.date + " " + res.data.time);
                    if (!refreshIntervalId) {
                        clearInterval(refreshIntervalId);
                    }
                    //start timer
                    var refreshIntervalId = setInterval(function () {
                        currentTime = currentTime.add(30, 'seconds');
                        setCurrentPickupTime(currentTime.format('LT'));
                    }, 30000);
                    return;
                }
                onError(res.data.message);
            }
        } catch (err) {
            onError();
        }
    }
    const loadTripList = async () => {
        try {
            const res = await TriplogServices.getTriplist();
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {

                    setTriplist(res.data.result);
                    return;
                }
                onError(res.data.message);
            }
        } catch (err) {
            onError();
        }
    }

    useEffect(() => {
        initialize();
    }, [])

    // const initall = () => {
    //     setAccountNo(props.currentBooking.account_setting);
    //     setTripLog(props.currentBooking.Triplog);

    //     if (tripLog.send_order == 'all') {
    //         if ((tripLog.device_id).length > 0) {
    //             setDeviceId(tripLog.device_id);
    //         } else {
    //             setDeviceId("all");
    //         }
    //     } else {
    //         if ((tripLog.device_id).length > 0) {
    //             setDeviceId(tripLog.device_id);
    //         } else {
    //             setDeviceId("");
    //         }
    //     }
    //     if (tripLog.status == 0 || tripLog.status == 1 || tripLog.status == 3) {
    //         setEditable(false);
    //     } else {
    //         setEditable(true);
    //     }
    //     if (tripLog.status == 0) {
    //         setEditable(false);
    //     } else {
    //         setEditable(true);
    //     }

    //     if (tripLog.is_uber == 1) {
    //         setSelectedOption('uber');
    //     } else if (tripLog.is_uber == 0 && (tripLog.car_no).length > 0 && tripLog.car_no != "Car #") {
    //         setSelectedOption(tripLog.device_id);
    //     } else if (tripLog.send_order == 'all' && tripLog.call_type != 'NET') {
    //         setSelectedOption('all');
    //     } else if (tripLog.call_type == 'NET') {
    //         setSelectedOption('net');
    //     }
    //     setShareallowed(tripLog.share)
    // }

    // useEffect(() => {
    //     initall()
    // }, []);
    console.log("drop2", dropofAddress2)
    return (
        <React.Fragment>
            <div className="modal d-block mymodal tripModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="align-items-center justify-content-center position-relative">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Trip Details</h5>
                                <button
                                    type="button"
                                    className="close-btn btn-close font-weight-cold"
                                    onClick={() => { props.SetShowTrip(false) }}
                                >
                                    X
                                </button>
                            </div>
                            <div className="modal-body py-3">
                                <div className="col-12">
                                    <Formik
                                        innerRef={formikRef}
                                        initialValues={initiaal_Values}
                                        validationSchema={TriplogSchema}
                                        onSubmit={(values) => {
                                            handleSubmit(values);
                                        }}>
                                        {({ errors, touched }) => (
                                            <Form>
                                                <>
                                                    <div className="row d-flex justify-content-left pl-0 pr-0 text-center">
                                                        <div className="col-md-4">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Car#: </label>
                                                                <Field as="select" name="car_no" className="form-control w-100">
                                                                    {userDetails.FleetDevices && userDetails.FleetDevices.map(el => (
                                                                        <option value={el.value} >{el.label}</option>
                                                                    ))}

                                                                </Field>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">

                                                            <div className="form-group ">
                                                                <label className="form_lbl">Cat Type: </label>
                                                                <Field as="select" name="cab_name" className="form-control w-100" >
                                                                    <option value="" >Car Type</option>
                                                                    {userDetails.CarType && userDetails.CarType.map(el => (
                                                                        <option >{el.label}</option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Date: </label>
                                                                <Field
                                                                    name="pickup_date"
                                                                    type="date"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Time: </label>
                                                                <Field
                                                                    name="pickup_time"
                                                                    className="form-control cur_time_log"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Notification: </label>
                                                                <Field
                                                                    name="TextDirectNotificationTime"
                                                                    placeholder="Notification"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Address: </label>
                                                                <Field
                                                                    name="pickup_address"
                                                                    id="pickupaddressid"
                                                                    placeholder="Pick-up-Address"
                                                                    className={`form-control ${touched.pickup_address && errors.pickup_address
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}
                                                                />
                                                                <Field
                                                                    name="pickup_lat"
                                                                    type="hidden"
                                                                />
                                                                <Field
                                                                    name="pickup_lng"
                                                                    type="hidden"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Address2: </label>
                                                                <Field
                                                                    id="pickupaddressid2"
                                                                    placeholder="Pick-up-Address"
                                                                    name="pickup_address2"
                                                                    className="form-control autoCompleteAddress"

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Drop off Address: </label>
                                                                <Field
                                                                    name="dropoff_address"
                                                                    id="dropofaddressid"
                                                                    placeholder="drop-off-Address"
                                                                    className={`form-control ${touched.dropoff_address && errors.dropoff_address
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}

                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Drop off Address2: </label>
                                                                <Field
                                                                    name="dropoff_address2"
                                                                    id="dropofaddressid2"
                                                                    placeholder="Please Enter Drop-off-Address"
                                                                    className="form-control autoCompleteAddress"

                                                                />
                                                                <Field
                                                                    name="dropoff_lat"
                                                                    type="hidden"
                                                                />
                                                                <Field
                                                                    name="dropoff_lng"
                                                                    type="hidden"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pickup Cross Street: </label>
                                                                <Field
                                                                    placeholder="Please Enter Pickup Cross Street"
                                                                    name="pickup_cross_street"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Drop Cross Street2: </label>
                                                                <Field
                                                                    name="dropoff_cross_street"
                                                                    placeholder="Please Enter Drop Cross Street"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Telephone : </label>
                                                                <Field
                                                                    placeholder="Please Enter Telephone Number"
                                                                    name="telephone"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Passenger Name : </label>
                                                                <Field
                                                                    name="passenger_name"
                                                                    placeholder="Please Enter Passenger Name "
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Number of Passengers : </label>

                                                                <Field as="select" name="amt_of_passengers" className="form-control w-100">

                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                    <option value="6">6</option>

                                                                </Field>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Dispatch Time : </label>
                                                                <Field
                                                                    name="dispatchTime"
                                                                    placeholder="Please Enter Dispatch Time "
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Fare : </label>
                                                                <Field
                                                                    name="fare"
                                                                    placeholder="Please Enter Tip "
                                                                    className={`form-control ${touched.fare && errors.fare
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Tip : </label>
                                                                <Field
                                                                    name="tip"
                                                                    placeholder="Please Enter Fare "
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Tolls : </label>
                                                                <Field
                                                                    name="tolls"
                                                                    placeholder="Please Enter tolls "
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Wait Time : </label>
                                                                <Field
                                                                    name="waittime"
                                                                    placeholder="Please Enter wait Time "
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Stops : </label>
                                                                <Field
                                                                    name="Stops"
                                                                    placeholder="Please Enter stop "
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Misc : </label>
                                                                <Field
                                                                    name="Misc"
                                                                    placeholder="Please Enter Misc "
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Account No : </label>
                                                                <Field
                                                                    name="account_no"
                                                                    placeholder="Please Enter Account Number "
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Voucher No : </label>
                                                                <Field
                                                                    name="VoucherNo"
                                                                    placeholder="Please Enter stop "
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4  text-center">

                                                        </div>
                                                        <div className="col-md-4  text-center">
                                                            <div className="form-group">
                                                                <label className="form_lbl">Notes : </label>
                                                                <Field
                                                                    id="notes"
                                                                    name="notes"

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4  text-center">

                                                        </div>



                                                        <div className="col-md-3 mt-1  text-left">
                                                            Make this round trip :
                                                        </div>

                                                        <div className="col-md-3 text-left  ">
                                                            <div >
                                                                <Field
                                                                    type="checkbox"
                                                                    name="roundtrip"
                                                                    value="1"
                                                                />
                                                                (It will work if correct drop off address entered)
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 text-center">
                                                            Sharing Allowed
                                                            <Field
                                                                type="checkbox"
                                                                name="share"
                                                                value="1"
                                                            />
                                                        </div>



                                                        <div className="col-md-3 text-left mt-4">
                                                            <div >
                                                                Copy Same Trip For Date Range With Days:

                                                            </div>
                                                        </div>

                                                        <div className="col-md-3  mt-4">
                                                            <div >
                                                                <Field
                                                                    type="date"
                                                                    name="multidayrange[multildaystart]"
                                                                    
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3  mt-4">
                                                            <Field
                                                                type="date"
                                                                name= "multidayrange[multildayend]"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <div className="col-md-3 mt-4">
                                                            <div >
                                                                (It will work if correct pickup address entered)
                                                            </div>
                                                        </div>


                                                        <div className="col-md-12 mt-3">
                                                            <Field
                                                                type="checkbox"
                                                                name="multidays"
                                                                value="Tuesday"
                                                            />
                                                            <span> Tuesday </span>

                                                            <Field
                                                                type="checkbox"
                                                                name="multidays"
                                                                value="Wednesday"

                                                            />

                                                            <span> Wednesday </span>

                                                            <Field
                                                                type="checkbox"
                                                                name="multidays"
                                                                value="Thursday"

                                                            />

                                                            <span> Thursday </span>

                                                            <Field
                                                                type="checkbox"
                                                                name="multidays"
                                                                value="Friday"
                                                            />

                                                            <span> Friday </span>

                                                            <Field
                                                                type="checkbox"
                                                                name="multidays"
                                                                value="Saturday"
                                                            />

                                                            <span> Saturday </span>

                                                            <Field
                                                                type="checkbox"
                                                                name="multidays"
                                                                value="Sunday"
                                                            />

                                                            <span> Sunday </span>

                                                            <Field
                                                                type="checkbox"
                                                                name="multidays"
                                                                value="Moday"
                                                            />

                                                            <span> Moday </span>
                                                        </div>

                                                        <div className="form-group col-md-12 mt-4">
                                                            <label className="form_lbl">&nbsp; </label>

                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                type="submit"
                                                            > Save
                                                            </Button>
                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                onClick={() => { props.SetShowTrip(false) }}
                                                                to={``}
                                                            > Close
                                                            </Button>
                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                onClick={() => { props.SetShowTrip(false) }}
                                                                to={``}
                                                            > Fare Estimate
                                                            </Button>
                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                onClick={() => { props.SetShowTrip(false) }}
                                                                to={``}
                                                            > Get Fare
                                                            </Button>

                                                        </div>
                                                    </div>
                                                </>
                                            </Form>
                                        )}
                                    </Formik>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TripDetails;

