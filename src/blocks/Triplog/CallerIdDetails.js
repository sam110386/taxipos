import React, { useEffect, useState, useRef } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import * as TriplogServices from '../../services/TriplogService';
import moment from "moment";
import TripDetails from "./TripDetails";
import { store } from "../../store/store";
import { setCallerIdAction } from "../../store/actions/SetCallerIdAction";
import { TriplogSchema } from './ValidationSchema/TriplogSchema';
import { CreateTrip } from "./CommonTriplog/CreateTrip";
import PickupAddress from "../Pickers/PickupAddress";
import DropoffAddress from "../Pickers/DropoffAddress";

const CallerIdDetails = (props) => {


    const formikRef = useRef();
    const [CurrentPickupTime, setCurrentPickupTime] = useState(0);
    const [CurrentDate, setCurrentDate] = useState(0);
    const [Triplist, setTriplist] = useState([]);
    const [showDetails, setShowDetails] = useState(false)
    const [dropofAddress, setDropofAddress] = useState("");
    const [dropofAddressLat, setDropofAddressLat] = useState("");
    const [dropofAddressLng, setDropofAddressLng] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [pickupAddressLat, setPickupAddressLat] = useState("");
    const [pickupAddressLng, setPickupAddressLng] = useState("");
    const [pickupLat, setPickupLat] = useState("")
    const [pickupLng, setPickupLng] = useState("")
    const [dropoffLat, setDropoffLat] = useState("")
    const [dropoffLng, setDropoffLng] = useState("")

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
        telephone: props.details.phone,
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
        formikRef.current.setFieldValue(
            "pickup_time",
            CurrentPickupTime
        );
        formikRef.current.setFieldValue(
            "pickup_date",
            CurrentDate
        );
    }, [CurrentPickupTime, CurrentDate]);

    const getPickupLatLng = (pickupAddressLat, pickupAddressLng) => {
        setPickupLat(pickupAddressLat);
        setPickupLng(pickupAddressLng);
    }
    const getDropoffLatLng = (dropofAddressLat, dropofAddressLng) => {
        setDropoffLat(dropofAddressLat);
        setDropoffLng(dropofAddressLng);
    }

    useEffect(() => {
        if (formikRef.current) {
            formikRef.current.setFieldValue(
                "pickup_lat",
                pickupLat
            );
            formikRef.current.setFieldValue(
                "pickup_date",
                CurrentDate
            );
            formikRef.current.setFieldValue(
                "pickup_lng",
                pickupLng
            );
            formikRef.current.setFieldValue(
                "dropoff_lat",
                dropoffLat
            );
            formikRef.current.setFieldValue(
                "dropoff_lng",
                dropoffLng
            );
        }

    }, [pickupLat, pickupLng, dropoffLat, dropoffLng, CurrentDate]);



    const handleSubmit = (values) => {
        let status = CreateTrip(values)
        if (status) {
            props.SetShowCallerId(false)
        }

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

    const Minimize = () => {
        store.dispatch(setCallerIdAction(props.details))
        props.SetShowCallerId(false)

    }

    return (
        <React.Fragment>
            <div className="modal d-block callidmodal tripModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog calleridmodal callmodal" role="document">
                    <div className="modal-content">
                        <div className="align-items-center justify-content-center position-relative">
                            <div className="modal-header">
                                <Button
                                    onClick={Minimize}
                                    style={{
                                        borderRadius: 3,
                                        backgroundColor: "#1c7be0d7",
                                        padding: "4px 10px",
                                        color: "white",
                                        fontSize: "10px"
                                    }}
                                    variant="contained"
                                >Minimize</Button>
                                <h6 className="modal-title">No Previous Trip Details Found :</h6>
                                <img src="/images/b_drop.png" onClick={() => { props.SetShowCallerId(false) }} className="rmbtn" alt="Cancel" />
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
                                                    <div className="row  d-flex justify-content-left pl-0 pr-0 text-center" id="myslider">
                                                        <div className="col-md-2">
                                                            <div className="form-group ">
                                                                Telephone Numaber
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group ">

                                                                Pick Up Address
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group ">
                                                                Drop Off Address
                                                            </div>
                                                        </div>

                                                        {
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
                                                        }

                                                        <div className="col-md-2">
                                                            <div className="form-group ">
                                                                <Field
                                                                    value={props.details.phone}
                                                                    className="form-control text-center"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-5">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Address: </label>
                                                                <Field
                                                                    component={PickupAddress}
                                                                    getPickupLatLng={getPickupLatLng}
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

                                                        <div className="col-md-5">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Drop off Address: </label>
                                                                <Field
                                                                    component={DropoffAddress}
                                                                    getDropoffLatLng={getDropoffLatLng}
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

                                                        <div className="col-md-2">
                                                            <div className="form-group ">
                                                                <Field
                                                                    value={props.details.phone}
                                                                    className="form-control text-center"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-5">
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
                                                        <div className="col-md-5">
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
                                                        <div className="col-md-2">
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
                                                        <div className="col-md-2">
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
                                                        <div className="col-md-4">
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

                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                onClick={() => { props.SetShowTrip(false) }}
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
                                                                onClick={() => { props.SetShowTrip(false) }}
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

export default CallerIdDetails;


