import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import * as TriplogServices from '../../services/TriplogService';
import { FullPageLoader } from "../Loaders";
import { Button } from "@material-ui/core";
import moment from "moment";

import Trips from "./TripList";
import EditTripDetails from "./EditTripDetails";
import toast, { Toaster } from 'react-hot-toast';
import TripDetails from "./TripDetails";




const TriplogWrap = () => {

    const formikRef = useRef();

    const TriplogSchema = Yup.object().shape({
        TextLocation: Yup.string().min(4).required("Please enter Pickup-Address"),
        TextDropoffAddress: Yup.string().required("Please enter Drop-off-Address"),
        TextAccountNo: Yup.string().min(4).required("Please enter Account Number"),
        TextTelephone: Yup.string().min(10),

    });


    const [submiting, setSubmitting] = useState(false);
    const [CurrentPickupTime, setCurrentPickupTime] = useState(0);
    const [CurrentDate, setCurrentDate] = useState(0);
    const [Triplist, setTriplist] = useState([]);
    const [showEditTrip, SetShowEditTrip] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [currentBooking, SetCurrentBooking] = useState([]);
    const [pickupAddress, setPickupAddress] = useState();
    const [dropofAddress, setDropofAddress] = useState();
    const [pickupAddressLatLng, setPickupAddressLatLng] = useState("");
    const [dropofAddressLatLng, setDropofAddressLatLng] = useState("");



    const getDropOffAddress = () => {
        const id = document.getElementById("dropoflocation")
        var autocomplete = new window.google.maps.places.Autocomplete((document.getElementById("dropofaddress")), {
            types: ['geocode']
        });

        window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var placeorg = autocomplete.getPlace();
            setDropofAddressLatLng(placeorg.geometry.location.lat() + ',' + placeorg.geometry.location.lng())
            setDropofAddress(placeorg.formatted_address)
        });
    }


    const getPickupAddress = () => {
        const id = document.getElementById("pickuplocation")
        var autocomplete = new window.google.maps.places.Autocomplete((document.getElementById("pickupaddress")), {
            types: ['geocode']
        });

        window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var placeorg = autocomplete.getPlace();
            setPickupAddressLatLng(placeorg.geometry.location.lat() + ',' + placeorg.geometry.location.lng())
            setPickupAddress(placeorg.formatted_address)
        });
    }


    useEffect(() => {
        getPickupAddress()
        getDropOffAddress()
    }, [1])






    const { user, userDetails } = useSelector((state) => {
        return {
            user: state.auth,
            userDetails: state.auth.userDetails
        };
    });


    const initiaal_Values = {

        TextCity: userDetails.DispatchData.city,
        TextState: userDetails.DispatchData.other_state,
        TextPickupCrossStreet: "",
        TextDropoffCrossStreet: "",
        TextLocation: "",
        TextOriginlatlng: "",
        TextPickupTime: moment().format(),
        TextPickupDate: moment().format(),
        TextDirectNotificationTime: "",
        TextTelephone: "",
        TextDropoffAddress: "",
        TextDestlatlng: "",
        TextDetails: "",
        TextAccountNo: "",
        TextShare: "",
        TextFare: "",

    }

    useEffect(() => {
        if (formikRef.current) {
            formikRef.current.setFieldValue(
                "TextLocation",
                pickupAddress,
                "TextDropoffAddress",
                dropofAddress
            );
            formikRef.current.setFieldValue(
                "TextDropoffAddress",
                dropofAddress
            );
            formikRef.current.setFieldValue(
                "TextPickupTime",
                moment().format('h:mm a')
            );
            formikRef.current.setFieldValue(
                "TextDestlatlng",
                dropofAddressLatLng
            );
            formikRef.current.setFieldValue(
                "TextOriginlatlng",
                dropofAddressLatLng
            );
        }

    }, [pickupAddress, dropofAddress])
    const onError = (message) => {
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
                        currentTime = currentTime.subtract(30, 'seconds');
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

    const createTrip = async (values) => {
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
    const handleSubmit = async (values) => {

        console.log("Submit", values)

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
    const getFate = async (values) => {
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

    useEffect(() => {
        initialize()
    }, []);
    return (
        <React.Fragment>
            <fieldset className="pendingentries">
                <legend>Pending Entries</legend>
                <img src="/images/clear_button.png" alt="Clear" className="clearchatsidebar" />
                <section className="chat-sidebar" id="chatsidebar">

                </section>
                <div id="latestCallerInfo" className="latestCallerInfo"></div>
            </fieldset>
            <fieldset className="DispatchInfoDriver">

                <legend> Dispatch info to Driver </legend>
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
                                            name="TextLocation"
                                            className="form-control autoCompleteAddress"

                                        />
                                        <Field
                                            name="TextOriginlatlng"
                                            type="hidden"
                                        />

                                        <br />

                                        {errors.TextLocation && touched.TextLocation ? (
                                            <div className="d-block invalid-feedback mt-n4 ml-3">
                                                {errors.TextLocation}
                                            </div>
                                        ) : null}

                                    </div>
                                    <br />

                                    <div className="col-1 pl-0">
                                        <Field
                                            name="TextPickupTime"
                                            className="form-control cur_time_log"
                                        />

                                    </div>
                                    <div className="col-1 pr-0 pl-0 ">
                                        <Field
                                            type="date"
                                            name="TextPickupDate"
                                            className="form-control unstyled"
                                        />
                                    </div>
                                    <div className="col-1">
                                        <Field
                                            name="TextDirectNotificationTime"
                                            placeholder="Notification"
                                            className="form-control"


                                        />
                                    </div>
                                    <div className="col-1 pl-0">
                                        <Field
                                            name="TextTelephone"
                                            placeholder="Telephone"
                                            className="form-control"


                                        />
                                        <br />

                                        {errors.TextTelephone && touched.TextTelephone ? (
                                            <div className="d-block invalid-feedback mt-n4 ml-3">
                                                {errors.TextTelephone}
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
                                            name="TextAccountNo"
                                            className="form-control"
                                        />
                                        <br />
                                        {errors.TextAccountNo && touched.TextAccountNo ? (
                                            <div className="d-block invalid-feedback mt-n4 ml-3">
                                                {errors.TextAccountNo}
                                            </div>
                                        ) : null}
                                    </div>



                                    <div className="col-2 pr-0">
                                        <div role="group" aria-labelledby="checkbox-group">
                                            <label>
                                                <Field
                                                    type="checkbox"
                                                    name="TextShare"
                                                    defaultChecked={userDetails.ShareAllowed ? true : false}
                                                />
                                                Sharing Allowed
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-left pl-0 pr-0 mt-3 ">
                                    <div className="col-4">
                                        <Field
                                            name="TextDropoffAddress"
                                            id="dropofaddress"
                                            placeholder="drop-off-Address"
                                            className="form-control autoCompleteAddress"

                                        />

                                        <Field
                                            name="TextDestlatlng"
                                            type="hidden"
                                        />
                                        <br />
                                        {errors.TextDropoffAddress && touched.TextDropoffAddress ? (
                                            <div className="d-block invalid-feedback mt-n4 ml-3">
                                                {errors.TextDropoffAddress}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="col-1 pl-0 pr-0">
                                        <Field
                                            placeholder="Fare"
                                            name="TextFare"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-1 pr-0">

                                        <select className="form-control w-100" defaultValue={userDetails.DefaultCarNo}>
                                            {userDetails.FleetDevices && userDetails.FleetDevices.map(el => (
                                                <option  >{el.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-2 pr-0">

                                        <select className="form-control w-100" defaultValue={userDetails.DefaultCarType}>
                                            <option value="" >Car Type</option>
                                            {userDetails.CarType && userDetails.CarType.map(el => (
                                                <option >{el.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-3 pr-0">
                                        <Button
                                            className="border btn btn-success text-capitalize"
                                            onClick={() => fareEstimate()}
                                            to={``}
                                        >
                                            Fare Estimate
                                        </Button>

                                        <Button
                                            className="border btn btn-success text-capitalize ml-1"
                                            onClick={() => getFate()}
                                            to={``}
                                        >
                                            Get Fare
                                        </Button>

                                        <Button
                                            className="border btn btn-success text-capitalize ml-1"
                                            onClick={() => openDetails()}
                                            to={``}
                                        >
                                            Details
                                        </Button>

                                        <Button
                                            className="border btn btn-success text-capitalize ml-1"
                                            type="submit"
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
                    >
                        Other Trips
                    </Button>
                    <Button
                        className="border link-success text-capitalize ml-1"
                        onClick={() => otherTrips()}
                        to={``}
                    >
                        Full View Map
                    </Button>
                    <Button
                        className="border link-success text-capitalize ml-1"
                        onClick={() => otherTrips()}
                        to={``}
                    >
                        Today History
                    </Button>
                    <Button
                        className="border link-success text-capitalize ml-1"
                        onClick={() => otherTrips()}
                        to={``}
                    >
                        Sort Trips
                    </Button>
                </div>
            </div>
            <Trips trips={Triplist} openTripDetails={openTripDetails} />
            {submiting && <FullPageLoader />}
            {showEditTrip && <EditTripDetails currentBooking={currentBooking} SetShowEditTrip={SetShowEditTrip} saveNetEditBooking={saveNetEditBooking} processNoShow={processNoShow} saveEditBooking={saveEditBooking} />}
            {showDetails && <TripDetails currentBooking={currentBooking} SetShowTrip={setShowDetails} saveNetEditBooking={saveNetEditBooking} processNoShow={processNoShow} saveEditBooking={saveEditBooking} />  }
        </React.Fragment>
    );
};

export default TriplogWrap;
{/*
    
   
<!-- right-content Ends -->
<section class="right-pannel" style="float: right;width: 100%">
<?php
$options = array('one' => 'One Device', 'all' => 'All Device');
$fleet_devices['all'] = 'Send To All';
$fleet_devices['net'] = 'Send To NET';
$fleet_devices['auto'] = 'Auto-Dispatch';
?>

   

<script type="text/javascript">
    window.oldMarkers = [];
    var map;
    var infowindow = null;
    var gmarkers = [];
    var lastClickedUniqueID = null;
    $(document).ready(initialize);
    
    function initialize() {
        //sort table on load
        sortTable();
        setInterval(function() {
            loadCurTime();
        }, 50000);
        setInterval(function() {
            sortTable();
        }, 30000);
    }

</script>
<div style='display:none'>
    <div id="tripEnterMoreDetailsBox">
        <section class="top_section form-control">
            <div class="row">
                <div class="col-md-12">
                    <h3>Enter Trip Details : </h3>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label>Car# : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->select('Push.device_id', $fleet_devices, array('class' => 'select TextDeviceId', 'empty' => 'Car #','onchange'=>"change_car()")); ?>
                    </div>
                </div>
                <div class="col-md-4">
                    <label>Car Type: </label>
                    <div class="field_widget">
                        <?php echo $this->Form->select('Push.cab_name', $cabname, array('class' => 'select cab_name', 'empty' => 'Car Type')); ?>
                    </div>
                </div>
                <div class="col-md-4">
                    <label>Pick Up Date : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.pickup_date', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false, 'value' => date('Y-m-d'), 'readonly' => 'readonly')); ?>
                    </div>
                </div>
                
            </div>
            <div class="row">
                    <div class="col-md-6">
                    <label>Pick Up time : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.pickup_time', array('size' => '30', 'class' => 'textfield required', 'value' => $curpickuptime, 'label' => false, 'div' => false)); ?>
                    </div>
                </div>
                <div class="col-md-6">
                   <label>Notification : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.direct_notification_time', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,'onkeypress'=>"return false;")); ?>
                    </div>     
                </div>
            </div>
            <form id="trip-details-form">
            <div class="row">
                <div class="col-md-6">
                     <label>Pick Up Address : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.pickup_address', array('size' => '30', 'class' => 'textfield required autoCompleteAddress', 'label' => false, 'div' => false,"onkeyup"=>"javascript:document.getElementById('PushOriginlatlng').value=''","placeholder"=>"Please enter pickup address")); ?>
                        <?php echo $this->Form->hidden('Push.originlatlng', array("value"=>"")); ?>
                    </div>   
                </div>
                <div class="col-md-6">
                     <label>Pick Up Address2 : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.pickup_address2', array('size' => '30', 'class' => 'textfield required autoCompleteAddress', 'label' => false, 'div' => false,"placeholder"=>"Please enter pickup address2")); ?>
                    </div>   
                </div>
            </div> 
            <div class="row">
                <div class="col-md-6">
                    <label>Cross Street : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.pickup_cross_street', array('size' => '30', 'class' => 'textfield required autoCompleteAddress', 'label' => false, 'div' => false,"placeholder"=>"Please enter cross street address")); ?>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>Drop off Address : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.dropoff_address', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"onkeyup"=>"javascript:document.getElementById('PushDestlatlng').value=''","placeholder"=>"Please enter dropoff address")); ?>
                        <?php echo $this->Form->hidden('Push.destlatlng', array("value"=>"")); ?>
                    </div>    
                </div>
                <div class="col-md-6">
                    <label>Drop off Address2 : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.dropoff_address2', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter dropoff address2")); ?>                        
                    </div> 
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>Cross Street : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.dropoff_cross_street', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter cross street address")); ?>                        
                    </div>
                </div>
             </div>
            </form>
            <div class="row">
                <div class="col-md-6">
                    <label>Telephone number :</label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.telephone', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter telephone")); ?>
                    </div>    
                </div>
                <div class="col-md-6">
                    <label>Passenger Name : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.passenger_name', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter passenger name")); ?>
                    </div>  
                </div>
               
            </div>
            <div class="row">
                 <div class="col-md-6">
                   <label>Number of Passengers : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->select('Push.amt_of_passengers', array(1=>1,2=>2,3=>3,4=>4,5=>5,6=>6),array('class' => 'textfield required', 'label' => false, 'div' => false,"empty"=>false,'default'=>1)); ?>
                    </div>     
                </div>
                <div class="col-md-6">
                    <label>Dispatch Time : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.dispatch_time', array('class' => 'textfield required', 'label' => false, 'div' => false,'onkeypress'=>"return false;","placeholder"=>"Please choose dispatch time")); ?>
                    </div>  
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label>Sharing Allowed : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->checkbox('Push.share', array( 'class' => 'required', 'label' => false, 'div' => false)); ?>
                    </div>    
                </div>
                <div class="col-md-4">
                     <label>Fare : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.fare', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter fare")); ?>
                    </div>   
                </div>
                <div class="col-md-4">
                    <label>Tip : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.tip', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter tip")); ?>
                    </div>   
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label>Tolls : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.toll', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter toll")); ?>
                    </div>   
                </div>
                 <div class="col-md-4">
                     <label>Wait time : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.wait_time', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter wait time fee")); ?>
                    </div>   
                </div>
                 <div class="col-md-4">
                    <label>Stops : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.stops', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter stop charges")); ?>
                    </div>   
                </div>
            </div> 
            <div class="row">
                <div class="col-md-4">
                    <label>Misc : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.misc', array('size' => '30', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter misc")); ?>
                    </div>  
                </div>
                <div class="col-md-4">
                    <label>Account No : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.account_no', array('type' => 'text', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter Accoun#")); ?>
                    </div>   
                </div>
                <div class="col-md-4">
                    <label>Voucher No : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.voucher_no', array('type' => 'text', 'class' => 'textfield required', 'label' => false, 'div' => false,"placeholder"=>"Please enter voucher#")); ?>
                    </div>   
                </div>
            </div>
            <div class="row">
                <div class="col-md-10">
                   <label>Notes : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->input('Push.details', array('type' => 'textarea', 'class' => 'textfield required', 'label' => false, 'div' => false)); ?>
                    </div>     
                </div>
            </div>
            <div class="row">
                <div class="col-md-10">
                   <label>Make This Round Trip : </label>
                    <div class="field_widget">
                        <?php echo $this->Form->checkbox('Push.roundtrip', array( 'class' => 'required', 'label' => false, 'div' => false)); ?>
                        <em>(It will work if correct drop off address entered)</em> 
                    </div>     
                </div>
                
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-3">
                        Copy Same Trip For Date Range With Days: 
                    </div>
                    <div class="col-md-2">
                        <?php echo $this->Form->input('Push.multildaystart', array('size' => '30', 'class' => 'textfield', 'label' => false, 'div' => false, 'value' => '', 'readonly' => 'readonly',"style"=>"width:90%")); ?>
                    </div>
                    <div class="col-md-2">
                        <?php echo $this->Form->input('Push.multildayend', array('size' => '30', 'class' => 'textfield', 'label' => false, 'div' => false, 'value' => '', 'readonly' => 'readonly',"style"=>"width:90%")); ?>
                    </div>
                    <div class="col-md-4">
                        <em>(It will work if correct pickup address entered)</em>
                    </div> 
                </div>
            </div>
            <div class="row" id="multidaysparent">
                <div class="col-md-12">
                    <div class="col-md-2">&nbsp;</div>
                    <div class="col-md-10">
                        <?php for($i=1;$i<=7;$i++):?>
                        <?php echo "&nbsp;&nbsp;".$this->Form->checkbox('Push.multildays', array("name"=>"PushMultidays[]", 'class' => 'required PushMultidays',"value"=>date('l',strtotime("+$i days")), 'label' => false, 'div' => false)); ?> <?php echo date('l',strtotime("+$i days"));?>
                        <?php endfor;?>
                    </div> 
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label>&nbsp;</label>
                    <div class="field_widget">
                    <?php
                        echo $this->Form->button('Save', array('type' => 'submit', 'class' => 'btn no-margin', 'div' => false, 'id' => 'savePushDetailsBtn'));
                        echo " ";
                        echo $this->Form->button('Cancel', array('type' => 'button', 'class' => 'btn no-margin', 'div' => false, 'id' => 'cancelPushDetailsBtn'));
                        echo " ";
                    ?>
                    <?php echo $this->Form->button('Fare Estimate', array('type' => 'button', 'class' => 'btn no-margin', 'div' => false,'onclick'=>'fare_estimate_detail()', 'style' => 'margin-right:6px;')); ?>
                    <?php echo " ";echo $this->Form->button('Get Fare', array('type' => 'button', 'class' => 'btn no-margin', 'div' => false, 'onclick' => 'getfare_detail()', 'style' => 'margin-right:6px;')); ?>
                    </div>     
                </div>
            </div>    
           
    </div>
</div>
<div style='display:none'>
    <div id="searchbarBox">
        <section class="top_section form-control">
            <div class="row">
                <div class="col-md-12">
                    <h3>Search </h3>
                </div>
            </div>
            <div class="row">
                <div class="col-md-5">
                    <div class="field_widget">
                        <?php echo $this->Form->input('Serachbar.key', array('class' => 'textfield',"div"=>false,"label"=>false, 'palceholder' => 'Search...')); ?>
                    </div>
                </div>
            </div>    
        </section>
        <section id="SerachbarResult" class="form-control">
                
        </section>
    </div>
</div>
<?php
echo $this->Html->script('colorbox');
echo $this->Html->script('jquery.timeentry.triplog');
echo $this->Html->css('colorbox');
?>
<div id="caller_popup">

</div>
<script type="text/javascript">

    function checkKey(e) {
        switch (e.keyCode) {
            case 112:
                document.getElementById("TextLocation").focus();
                break;
            case 113:
                location.href = "#left-content";
                break;
            default:
        }
    }
    if ($.browser.mozilla) {
        $(document).keypress(checkKey);
    } else {
        $(document).keydown(checkKey);
    }

</script>

<script type="text/javascript">

    $(document).ready(function() {
        var triplog_device_id = "<?php echo $this->Session->read('triplog_device_id'); ?>";
        $('#TextDeviceId').val(triplog_device_id);
        change_car();
    });
</script>
<script type="text/javascript">
    var flag = 0;
    $(document).ready(function() {
        $(document).keypress(function() {
            flag = 1;
        });
    });
    function checkKeyPress() {
        //if (flag == 0) {
        window.location.reload();
       // }
    }
    function resetFlag() {
        flag = 0;
    }
    setTimeout(checkKeyPress, 30 * 60 * 1000);
    setTimeout(resetFlag, 1 * 60 * 1000);
</script>
<script type="text/javascript">
var pubnub = new PubNub({
	subscribeKey: "<?php echo Configure::read('PUBNUB.sub_key');?>",
	publishKey: "<?php echo Configure::read('PUBNUB.pub_key');?>"
});
pubnub.addListener({
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        var publisher = m.publisher; //The Publisher
        //alert(msg.tripid);
        console.log(msg);
        processpubnub(msg);
    },
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change or timeout
        var channelName = p.channel; // The channel for which the message belongs
        var occupancy = p.occupancy; // No. of users connected with the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are connected with the channel
    },
    status: function(s) {
        var affectedChannelGroups = s.affectedChannelGroups;
        var affectedChannels = s.affectedChannels;
        var category = s.category;
        var operation = s.operation;
    }
});
pubnub.subscribe({
    channels: ['PCAPP_<?php echo $this->Session->read('dispacherId');?>','CTGPCAPP_<?php echo $this->Session->read('dispacherId');?>']
});


function processpubnub(msg){
    var TripId=msg.tripid;
    if(msg.messageType=='cancelTripWeb'){
        $("table#tripLogTable tr#tripRow"+TripId).remove();
        return;
    }
    if(msg.status=="3"){
        $("table#tripLogTable tr#tripRow"+TripId).remove();
        return;
    }
    if(msg.messageType=='Add'){
        grabTripDetails(TripId,'Add');
    }
    if(msg.messageType=='Edit'){
        grabTripDetails(TripId,'Edit');
    }
    if(msg.messageType=='statusUpdate'){
        grabTripDetails(TripId,'Edit');
    }
    if(msg.messageType=='award'){
        grabTripDetails(TripId,'Edit');
    }
    if(msg.messageType=='callerid'){
        getcallerinfo();
    }

}

function getcallerinfo(){
    $.post("/dispachers/load_caller_info_triplog", {}, function(data) {
        jQuery('#latestCallerInfo').html(data);
    });
}

function grabTripDetails(TripId,action){
    if(!TripId)return;
    $.ajax({
        url: SITE_URL + "dispachers/grabTripDetails",
        type: "post",
        dataType:'json',
        data: {"TripId":TripId},
        async: false,
        success: function (data) {
            if(data.sessiontimeout){
                //dispacher session timed out
                document.location.reload(true);
            }
            if(data.status==3){
                $("table#tripLogTable tr#tripRow"+TripId).remove();
            }
            if(data.status==0){
                $("table#tripLogTable tbody#awardarrive tr#tripRow"+TripId).remove();
                $("table#tripLogTable tbody#pickedup tr#tripRow"+TripId).remove();
                //$("table#tripLogTable").find("#webBooking").append(data);
                if($("table#tripLogTable tbody#new tr#tripRow"+TripId).length>0){
                    $("table#tripLogTable tbody#new tr#tripRow"+TripId).replaceWith(data.html);
                }else if($("table#tripLogTable tbody#new").find("tr").length>0){
                    $("table#tripLogTable tbody#new").find("tr:last").after(data.html);
                }else{
                    $("table#tripLogTable").find("tbody#new").html(data.html);
                }
            }
            
            //if(action==='Edit'){
                if(data.status==4){
                    $("table#tripLogTable tbody#awardarrive tr#tripRow"+TripId).remove();
                    $("table#tripLogTable tbody#new tr#tripRow"+TripId).remove();
                    if($("table#tripLogTable tbody#pickedup tr#tripRow"+TripId).length>0){
                        $("table#tripLogTable tbody#pickedup tr#tripRow"+TripId).replaceWith(data.html);
                    }else if($("table#tripLogTable tbody#pickedup ").find("tr").length>0){
                        $("table#tripLogTable tbody#pickedup ").find("tr:last").after(data.html);
                    }else{
                        $("table#tripLogTable").find("tbody#pickedup").html(data.html);
                    }  
                }else if(data.status==1 || data.status==5){
                    $("table#tripLogTable tbody#pickedup tr#tripRow"+TripId).remove();
                    $("table#tripLogTable tbody#new tr#tripRow"+TripId).remove();
                    if($("table#tripLogTable tbody#awardarrive tr#tripRow"+TripId).length>0){
                        $("table#tripLogTable tbody#awardarrive tr#tripRow"+TripId).replaceWith(data.html);
                    }else if($("table#tripLogTable tbody#awardarrive").find("tr").length>0){
                        $("table#tripLogTable tbody#awardarrive").find("tr:last").after(data.html);
                    }else{
                        $("table#tripLogTable").find("tbody#awardarrive").html(data.html);
                    } 
                }else{
                    if($("table#tripLogTable tbody#new tr#tripRow"+TripId).length>0){
                        $("table#tripLogTable tbody#new tr#tripRow"+TripId).replaceWith(data.html);
                    }else if($("table#tripLogTable tbody#new").find("tr").length>0){
                        $("table#tripLogTable tbody#new").find("tr:last").after(data.html);
                    }else{
                        $("table#tripLogTable").find("tbody#new").html(data.html);
                    }
                }
            //}
        }
    });
}
</script>
            
<script type="text/javascript">
   var sendInfoToAffiliatetriplogFlag=false;
    $(document).ready(function() {
        $(':input').focus(function() {
            $(':input').removeClass("focused");
            $(this).addClass("focused");
        });
    });
  </script>
*/}
