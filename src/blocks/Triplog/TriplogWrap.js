import React, { useEffect, useState, useRef, useMemo } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector } from "react-redux";
import * as TriplogServices from '../../services/TriplogService';
import { Button } from "@material-ui/core";
import moment from "moment";
import Trips from "./TripList";
import EditTripDetails from "./EditTripDetails";
import toast, { Toaster } from 'react-hot-toast';
import TripDetails from "./TripDetails";
import CallerIdInfo from "./CallerIdInfo";
import { Loader } from 'google-maps';
import Chatsidebar from "./Chatsidebar";
import { Time_Picker } from "../Pickers/Time_Picker";
import { TriplogSchema } from './ValidationSchema/TriplogSchema'
import { CreateTrip } from "./CommonTriplog/CreateTrip";


const TriplogWrap = (props) => {

    const formikRef = useRef();
    const [submiting, setSubmitting] = useState(false);
    const [CurrentPickupTime, setCurrentPickupTime] = useState(null);
    const [CurrentDate, setCurrentDate] = useState(0);
    const [Triplist, setTriplist] = useState([]);
    const [showEditTrip, SetShowEditTrip] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [currentBooking, SetCurrentBooking] = useState([]);
    const [pickupAddress, setPickupAddress] = useState("");
    const [dropofAddress, setDropofAddress] = useState("");
    const [pickupAddressLat, setPickupAddressLat] = useState("");
    const [pickupAddressLng, setPickupAddressLng] = useState("");
    const [dropofAddressLat, setDropofAddressLat] = useState("");
    const [dropofAddressLng, setDropofAddressLng] = useState("");
    const [cabName, setCabName] = useState("Business Sedan");
    const [fareInput, setFareInput] = useState("");

    let initial_Values = {
        pickup_lat: "",
        pickup_lng: "",
        pickup_address: "",
        device_id: "",
        pickup_date: "",
        pickup_time: CurrentPickupTime,
        dropoff_lat: "",
        dropoff_lng: "",
        dropoff_address: "",
        car_no: "",
        cab_name: "",
        telephone: "",
        telephone_line: "",
        amt_of_passengers: "",
        fare: "",
        details: "",
        direct_notification_time: "",
        pickdrop_fare: "",
        account_no: "",
        share: "",
        pickup_cross_street: "",
        dropoff_cross_street: "",
    }

    //   let  initial_Values = useMemo(()=>{
    //       if(CurrentPickupTime){
    //           return {
    //             pickup_lat: "",
    //             pickup_lng: "",
    //             pickup_address: "KJN ",
    //             device_id: "",
    //             pickup_date: "",
    //             pickup_time: CurrentPickupTime,
    //             dropoff_lat: "",
    //             dropoff_lng: "",
    //             dropoff_address: "nb",
    //             car_no: "",
    //             cab_name: "",
    //             telephone: "",
    //             telephone_line: "",
    //             amt_of_passengers: "",
    //             fare: "",
    //             details: "",
    //             direct_notification_time: "",
    //             pickdrop_fare: "",
    //             account_no: "",
    //             share: "",
    //             pickup_cross_street: "",
    //             dropoff_cross_street: "",
    //           }
    //       }
    //       return {
    //         pickup_lat: "",
    //         pickup_lng: "",
    //         pickup_address: "KJK J Ls",
    //         device_id: "",
    //         pickup_date: "",
    //         pickup_time: CurrentPickupTime,
    //         dropoff_lat: "",
    //         dropoff_lng: "",
    //         dropoff_address: "",
    //         car_no: "",
    //         cab_name: "",
    //         telephone: "",
    //         telephone_line: "",
    //         amt_of_passengers: "",
    //         fare: "",
    //         details: "",
    //         direct_notification_time: "",
    //         pickdrop_fare: "",
    //         account_no: "",
    //         share: "",
    //         pickup_cross_street: "",
    //         dropoff_cross_street: "",
    //       }

    //   },[CurrentPickupTime])

    const { user, trip, userDetails } = useSelector((state) => {
        return {
            user: state.auth,
            userDetails: state.auth.userDetails,
            trip: state.trip
        };
    });

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

    useEffect(() => {
        formikRef.current.setFieldValue(
            "pickup_time",
            CurrentPickupTime
        );
        formikRef.current.setFieldValue(
            "pickup_date",
            CurrentDate
        );
    }, [CurrentDate, CurrentPickupTime]);


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
        }
    }, [pickupAddress, dropofAddress])


    const onError = (message) => {
        toast.error(message)
        //setError(true);
    };

    const onDialogClose = () => {
        //setError(false);
        //setErrorMessage("");
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


    const handleSubmit = (values) => {
        CreateTrip(values);
    };

    const fareEstimate = async (values) => {
        try {
            setSubmitting(true);
            const res = await TriplogServices.getTriplist({});
            setSubmitting(false);
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                    // onSuccess(res.data);
                    return;
                }
                onError(res.data.message);
            }
        } catch (err) {
            setSubmitting(false);
            onError();
        }
    };
    const getFate = async (value) => {

        if (!value.pickupAddress) {
            return toast.error("Please Enter Pick-up-Address")
        } else if (!value.dropofAddress) {
            return toast.error("Please Enter Drop-of-Address")
        }
        try {
            setSubmitting(true);
            const res = await TriplogServices.getFare({ orglatlng: `${value.pickupAddressLat},${value.pickupAddressLng}`, deslatlng: `${value.dropofAddressLat},${value.dropofAddressLng}`, orgadress: value.pickupAddress, desadress: value.dropofAddress, cab_type: value.cabName });
            setSubmitting(false);
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                    setFareInput(res.data.result.fare)
                    // onSuccess(res.data);
                    return;
                }
                onError(res.data.message);
            }
        } catch (err) {
            setSubmitting(false);
            onError();
        }
    };
    const openDetails = async (values) => {
        try {
            setSubmitting(true);
            const res = await TriplogServices.getTriplist({});
            setSubmitting(false);
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                    setShowDetails(true)
                    // onSuccess(res.data);
                    return;
                }
                onError(res.data.message);
            }
        } catch (err) {
            setSubmitting(false);
            onError();
        }
    };
    const openTripDetails = async (trip, dispacher, el) => {
        try {
            setSubmitting(true);
            const res = await TriplogServices.getTripDetails({ tripid: trip });
            setSubmitting(false);
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                    SetCurrentBooking(res.data.result);
                    SetShowEditTrip(true);
                    return;
                }
                onError(res.data.message);
            }
        } catch (err) {
            setSubmitting(false);
            onError();
        }
    };
    const otherTrips = async (values) => {
        try {
            setSubmitting(true);
            const res = await TriplogServices.getTriplist({});
            setSubmitting(false);
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                    // onSuccess(res.data);
                    return;
                }
                onError(res.data.message);
            }
        } catch (err) {
            setSubmitting(false);
            onError();
        }
    };

    const saveNetEditBooking = async (values) => {
        try {
            setSubmitting(true);
            const res = await TriplogServices.getTriplist({});
            setSubmitting(false);
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                    // onSuccess(res.data);
                    return;
                }
                onError(res.data.message);
            }
        } catch (err) {
            setSubmitting(false);
            onError();
        }
    };
    const processNoShow = async (values) => {
        try {
            setSubmitting(true);
            const res = await TriplogServices.getTriplist({});
            setSubmitting(false);
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                    // onSuccess(res.data);
                    return;
                }
                onError(res.data.message);
            }
        } catch (err) {
            setSubmitting(false);
            onError();
        }
    };

    const btnstyle = {
        border: "1px solid #4679B7",
        borderRadius: 5,
        boxShadow: "0 0 1px #ffffff inset",
        color: "#FFFFFF",
        cursor: "pointer",
        display: "inline",
        fontSize: "14px",
        fontWeight: "bold",
        height: "30px",
        backgroundColor: "rgba(12, 12, 12, 0.667)",
        margin: "12px 10px 0 0",
        overflow: "visible",
        padding: "0 15px",
        textTransform: "uppercase"
    }



    const saveEditBooking = async (values) => {
        try {
            setSubmitting(true);
            const res = await TriplogServices.getTriplist({});
            setSubmitting(false);
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                    // onSuccess(res.data);
                    return;
                }
                onError(res.data.message);
            }
        } catch (err) {
            setSubmitting(false);
            onError();
        }
    };

    // useEffect(() => {
    //     initialize()
    // }, []);


    // window.$('#pickup_time').timepicker({
    //      dynamic: true,
    //  });

    // window.$('#direct_notification_time').timepicker({
    //     timeFormat: 'H:mm',
    //     interval: 10,
    //     minTime: '00:10',
    //     maxTime: '11:59pm',
    //     defaultTime: '11',
    //     startTime: '00:10',
    //     dynamic: false,
    //     dropdown: true,
    //     scrollbar: true,
    // })


    // const MyNotification = ({ field, form, ...props }) => {
    //     window.$('#direct_notification_time').timepicker({
    //         timeFormat: 'H:mm',
    //         interval: 10,
    //         minTime: '00:10',
    //         maxTime: '11:59pm',
    //         defaultTime: '11',
    //         startTime: '00:10',
    //         dynamic: false,
    //         dropdown: true,
    //         scrollbar: true,
    //     })
    //     return <input type="text" {...field} {...props}  />;
    //   };

    return (
        <React.Fragment >

            <div >
                <fieldset className="pendingentries" >
                    <legend>Pending Entries</legend>
                    <img src="/images/clear_button.png" alt="Clear" className="clearchatsidebar mb-1" />
                    <section className="chat-sidebar" id="chatsidebar">
                        <Chatsidebar />
                    </section>
                    <CallerIdInfo />
                </fieldset>
                <fieldset className="DispatchInfoDriver">
                    <legend>Dispatch info to Driver</legend>
                    <Formik
                        innerRef={formikRef}
                        initialValues={initial_Values}
                        validationSchema={TriplogSchema}
                        onSubmit={(values) => {
                            handleSubmit(values);
                        }}>
                        {({ errors, touched }) => (
                            <Form>
                                <>
                                    <div className="row d-flex justify-content-left pl-0 pr-0">

                                        <Field
                                            name="TextCity"
                                            type="hidden"
                                            className="form-control"
                                        />
                                        <Field
                                            name="TextState"
                                            type="hidden"
                                            className="form-control"
                                        />
                                        <Field
                                            name="TextPickupCrossStreet"
                                            type="hidden"
                                            className="form-control"
                                        />
                                        <Field
                                            name="TextDropoffCrossStreet"
                                            type="hidden"
                                            className="form-control"
                                        />

                                        <div className="col-4">
                                            <Field
                                                id="pickupaddress"
                                                placeholder="Pick-up-Address"
                                                name="pickup_address"
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
                                            <br />
                                            {errors.pickup_address && touched.pickup_address ? (
                                                <div className="d-block invalid-feedback mt-n4 ml-3">
                                                    {errors.pickup_address}
                                                </div>
                                            ) : null}

                                        </div>
                                        <br />
                                        <div className="col-2 pl-0">
                                            <Field
                                                name="pickup_time"
                                                className="form-control"
                                                component={Time_Picker}
                                            />
                                        </div>
                                        <div className="col-2 pr-0 pl-0">
                                            <Field
                                                type="date"
                                                name="pickup_date"
                                                autocomplete="off"
                                                className="form-control unstyled"
                                            />
                                        </div>
                                        <div className="col-1">
                                            <Field
                                                name="direct_notification_time"
                                                placeholder="Notification"
                                                id="direct_notification_time"
                                                className="form-control"
                                            // component={MyNotification}
                                            />
                                        </div>
                                        <div className="col-1 pl-0">
                                            <Field
                                                name="telephone"
                                                placeholder="Telephone"
                                                className="form-control"
                                                autocomplete="off"
                                            />

                                            <br />

                                            {errors.telephone && touched.telephone ? (
                                                <div className="d-block invalid-feedback mt-n4 ml-3">
                                                    {errors.telephone}
                                                </div>
                                            ) : null}
                                        </div>

                                        <Field
                                            name="TextDetails"
                                            type="hidden"
                                            className="form-control"
                                        />
                                        <div className="col-1 pr-0 pl-0">
                                            <Field
                                                placeholder="Account Number"
                                                name="account_no"
                                                className="form-control"
                                                autocomplete="off"
                                            />
                                            <br />
                                            {errors.account_no && touched.account_no ? (
                                                <div className="d-block invalid-feedback mt-n4 ml-3">
                                                    {errors.account_no}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="col-1 pr-0">
                                            <div role="group" aria-labelledby="checkbox-group">
                                                <label>
                                                    <Field
                                                        type="checkbox"
                                                        name="TextShare"
                                                    />
                                                    Sharing Allowed
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-left pl-0 pr-0 mt-3 ">
                                        <div className="col-4">
                                            <Field
                                                name="dropoff_address"
                                                id="dropofaddress"
                                                autocomplete="off"
                                                placeholder="drop-off-Address"
                                                className={`form-control ${touched.dropoff_address && errors.dropoff_address
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                            />
                                            <Field
                                                name="dropoff_lat"
                                                type="hidden"
                                            />
                                            <Field
                                                name="dropoff_lng"
                                                type="hidden"
                                            />
                                            <br />
                                            {errors.dropoff_address && touched.dropoff_address ? (
                                                <div className="d-block invalid-feedback mt-n4 ml-3">
                                                    {errors.dropoff_address}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="col-1 pl-0 pr-0">
                                            <Field
                                                placeholder="Fare"
                                                name="fare"
                                                autocomplete="off"
                                                className={`form-control ${touched.fare && errors.fare
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                            />
                                        </div>
                                        <div className="col-1 pr-0">
                                            <Field as="select" className="form-control w-100" name="car_no">
                                                {userDetails.FleetDevices && userDetails.FleetDevices.map(el => (
                                                    <option value={el.label}>{el.label}</option>
                                                ))}
                                            </Field>
                                        </div>
                                        <div className="col-2 pr-0">

                                            <Field as="select" className="form-control w-100" name="cab_name" onChange={(e) => { setCabName(e.target.value) }}>
                                                {userDetails.CarType && userDetails.CarType.map(el => (
                                                    <option value={el.label} >{el.label}</option>
                                                ))}
                                            </Field>
                                        </div>
                                        <div className="col-4 pr-0">
                                            <Button
                                                className="border btn btn-success text-capitalize"
                                                onClick={() => fareEstimate()}
                                                to={``}
                                                style={{
                                                    borderRadius: 8,
                                                    backgroundColor: "#1c7be0d7",
                                                    padding: "7px 14px",
                                                    color: "white",
                                                    fontSize: "12px"
                                                }}
                                                variant="contained"

                                            >
                                                Fare Estimate
                                            </Button>

                                            <Button
                                                className="border btn btn-success text-capitalize ml-1"
                                                onClick={() => getFate({ pickupAddress, pickupAddressLat, pickupAddressLng, dropofAddress, dropofAddressLat, dropofAddressLng, cabName })}
                                                to={``}
                                                style={{
                                                    borderRadius: 8,
                                                    backgroundColor: "#1c7be0d7",
                                                    padding: "7px 14px",
                                                    color: "white",
                                                    fontSize: "12px"
                                                }}
                                                variant="contained"
                                            >
                                                Get Fare
                                            </Button>

                                            <Button
                                                className="border btn btn-success text-capitalize ml-1"
                                                onClick={() => openDetails()}
                                                to={``}
                                                style={{
                                                    borderRadius: 8,
                                                    backgroundColor: "#1c7be0d7",
                                                    padding: "7px 14px",
                                                    color: "white",
                                                    fontSize: "12px"
                                                }}
                                                variant="contained"
                                            >
                                                Details
                                            </Button>

                                            <Button
                                                className="border btn btn-success text-capitalize ml-1"
                                                type="submit"
                                                style={{
                                                    borderRadius: 8,
                                                    backgroundColor: "#1c7be0d7",
                                                    color: "white",
                                                    padding: "7px 14px",
                                                    fontSize: "12px"
                                                }}
                                                variant="contained"
                                            >
                                                Send
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            </Form>
                        )}
                    </Formik>

                </fieldset>
                <div className="row">
                    <div className="col-12 pull-right text-right mt-2 mb-2">
                        <Button
                            className="border link-success text-capitalize ml-1"
                            onClick={() => otherTrips()}
                            to={``}
                            style={btnstyle}
                            variant="contained"
                        >
                            Other Trips
                        </Button>
                        <Button
                            className="border link-success text-capitalize ml-1 mynewbtn"
                            onClick={() => otherTrips()}
                            to={``}
                            style={btnstyle}
                            variant="contained"
                        >
                            Full View Map
                        </Button>
                        <Button
                            className="border link-success text-capitalize ml-1"
                            onClick={() => otherTrips()}
                            to={``}
                            style={btnstyle}
                            variant="contained"
                        >
                            Today History
                        </Button>
                        <Button
                            className="border link-success text-capitalize ml-1"
                            onClick={() => otherTrips()}
                            to={``}
                            style={btnstyle}
                            variant="contained"
                        >
                            Sort Trips
                        </Button>
                    </div>
                </div>

                {Triplist && <Trips trips={Triplist} openTripDetails={openTripDetails} />}
                {showEditTrip && <EditTripDetails currentBooking={currentBooking} SetShowEditTrip={SetShowEditTrip} saveNetEditBooking={saveNetEditBooking} processNoShow={processNoShow} saveEditBooking={saveEditBooking} />}
                {showDetails && <TripDetails SetShowTrip={setShowDetails} />}
            </div>
        </React.Fragment>
    );
};

export default TriplogWrap;
