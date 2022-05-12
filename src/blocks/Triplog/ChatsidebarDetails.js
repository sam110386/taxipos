import React, { useEffect, useState, useRef } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { FullPageLoader } from "../Loaders";
import { Button } from "@material-ui/core";
import * as TriplogServices from '../../services/TriplogService';
import moment from "moment";
import TripDetails from "./TripDetails";
import Chatsidebar from "./Chatsidebar";
import { store } from "../../store/store";
import { SetNumberAction } from "../../store/actions/SetNumberAction";


const ChatsidebarDetails = (props) => {

    // console.log("calleridprops", props.details.all_trips[0].Triplog.telephone);


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
    const [showDetails, setShowDetails] = useState(false)


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

    const setPickupDetails = (pickup_address, pickup_lat, pickup_lng) => {
        setPickupAddressLat(pickup_lat)
        setPickupAddressLng(pickup_lng)
        setPickupAddress(pickup_address)
    }
    const setDropOffDetails = (dropoff_address, dropoff_lat, dropoff_lng) => {
        setDropofAddressLat(dropoff_lat)
        setDropofAddressLng(dropoff_lng)
        setDropofAddress(dropoff_address)
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

    }
    const fareEstimate = () => {

    }
    const getFare = () => {

    }

    const onError = (message) => {
        //setError(true);
    };

    const showTripDetails = () => {
        setShowDetails(true)

    }



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


    // window.$('#timepicker').timepicker({
    //     dynamic: false,
    //     dropdown: true,
    // });

    // window.$('#notifi').timepicker({
    //     timeFormat: 'H:mm',
    //     interval: 10,
    //     minTime: '00:10',
    //     maxTime: '11:59pm',
    //     defaultTime: '11',
    //     startTime: '00:10',
    //     dynamic: false,
    //     dropdown: true,
    //     scrollbar: true
    // });



    return (
        <React.Fragment>
            <div className="modal d-block callidmodal gitmodal tripModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog callmodal2" role="document">
                    <div className="modal-content">
                        <div className="align-items-center justify-content-center position-relative">
                            <div className="modal-header">
                                <h1></h1>
                                <img src="/images/b_drop.png" onClick={() => { props.SetShowCallerId(false) }} className="rmbtn" alt="Cancel" />
                            </div>
                            <div className="modal-body py-2">
                                
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
                                                    <div className="row  d-flex justify-content-left pl-0 pr-0 text-center" id="myslider">
                                                      
                                                        <div className="col-md-6">
                                                            <div className="form-group ">

                                                                Pick Up Address
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                Drop Off Address
                                                            </div>
                                                        </div>
                                                        {/* {
                                                            props.details.all_trips && props.details.all_trips.map((e, index) => (
                                                                <>

                                                                    <div className="col-md-2">
                                                                        <div className="form-group ">
                                                                            <Field
                                                                                value={e.Triplog.telephone}
                                                                                className="form-control text-center"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-5">
                                                                        <div className="callerIdSlider" id="l01" tabindex="1" onClick={() => setPickupDetails(e.Triplog.pickup_address, e.Triplog.pickup_lat, e.Triplog.pickup_lng)}>
                                                                            <h6 >{e.Triplog.pickup_address}</h6>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-5">
                                                                        <div className="callerIdSlider" id="l02" tabindex="0" onClick={() => setDropOffDetails(e.Triplog.dropoff_address, e.Triplog.dropoff_lat, e.Triplog.dropoff_lng)}>
                                                                            <h6>{e.Triplog.dropoff_address}</h6>
                                                                        </div>
                                                                    </div>

                                                                </>

                                                            ))
                                                        } */}


                                                      
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Address: </label>
                                                                <Field
                                                                    name="pickup_address"
                                                                    id="pickupaddressid"
                                                                    placeholder="Pick-up-Address"
                                                                    autocomplete="off"
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
                                                                <label className="form_lbl">Drop off Address: </label>
                                                                <Field
                                                                    name="dropoff_address"
                                                                    id="dropofaddressid"
                                                                    placeholder="drop-off-Address"
                                                                    autocomplete="off"
                                                                    className={`form-control ${touched.dropoff_address && errors.dropoff_address
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}

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
                                                                    autocomplete="off"
                                                                />
                                                            </div>
                                                        </div>
                                                      
                                                        
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Drop Cross Street: </label>
                                                                <Field
                                                                    placeholder="Please Enter Drop Cross Street"
                                                                    name="drop_cross_street"
                                                                    className="form-control"
                                                                    autocomplete="off"
                                                                />
                                                            </div>
                                                        </div>
                                                      
                                                    
                                                        <div className="col-md-3">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Date: </label>
                                                                <Field
                                                                    name="pickup_date"
                                                                    type="date"
                                                                    className="form-control"
                                                                    autocomplete="off"

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Time: </label>
                                                                <Field
                                                                    name="pickup_time"
                                                                    id="timepicker"
                                                                    className="form-control cur_time_log"
                                                                    autocomplete="off"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Notification: </label>
                                                                <Field
                                                                    name="direct_notification_time"
                                                                    id="notifi"
                                                                    placeholder="Notification"
                                                                    className="form-control"
                                                                    autocomplete="off"
                                                                />
                                                            </div>
                                                        </div>




                                                        <div className="col-md-2">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Fare : </label>
                                                                <Field
                                                                    name="fare"
                                                                    placeholder="Please Enter Tip "
                                                                    autocomplete="off"
                                                                    className={`form-control ${touched.fare && errors.fare
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Notes: </label>
                                                                <Field
                                                                    name="notes"
                                                                    id="not"
                                                                    className="form-control cur_time_log"
                                                                    autocomplete="off"
                                                                />
                                                            </div>
                                                        </div>
                                                       

                                                        <div className="form-group col-md-12 mt-4">
                                                            <label className="form_lbl">&nbsp; </label>

                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                type="submit"
                                                                style={{
                                                                    borderRadius: 8,
                                                                    backgroundColor: "#1c7be0d7",
                                                                    padding: "7px 14px",
                                                                    color: "white",
                                                                    fontSize: "12px"
                                                                }}
                                                                variant="contained"
                                                            > Enter
                                                            </Button>
                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                onClick={showTripDetails}
                                                                style={{
                                                                    borderRadius: 8,
                                                                    backgroundColor: "#1c7be0d7",
                                                                    padding: "7px 14px",
                                                                    color: "white",
                                                                    fontSize: "12px"
                                                                }}
                                                                variant="contained"
                                                            > Details
                                                            </Button>
                                                            {/* <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                onClick={() => { props.SetShowTrip(false) }}
                                                                to={``}
                                                            > Close
                                                            </Button> */}
                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                // onClick={() => { props.SetShowTrip(false) }}
                                                                to={``}
                                                                style={{
                                                                    borderRadius: 8,
                                                                    backgroundColor: "#1c7be0d7",
                                                                    padding: "7px 14px",
                                                                    color: "white",
                                                                    fontSize: "12px"
                                                                }}
                                                                variant="contained"
                                                            > Fare Estimate
                                                            </Button>
                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                // onClick={() => { props.SetShowTrip(false) }}
                                                                to={``}
                                                                style={{
                                                                    borderRadius: 8,
                                                                    backgroundColor: "#1c7be0d7",
                                                                    padding: "7px 14px",
                                                                    color: "white",
                                                                    fontSize: "12px"
                                                                }}
                                                                variant="contained"
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
            {showDetails && <TripDetails SetShowTrip={setShowDetails} />}
        </React.Fragment>
    );
};

export default ChatsidebarDetails;


