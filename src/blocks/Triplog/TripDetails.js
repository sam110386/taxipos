import React, { useEffect, useState, useRef } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { FullPageLoader } from "../Loaders";
import { Button } from "@material-ui/core";
import moment from "moment";
const optSchema = Yup.object().shape({
    otp: Yup.string()
        .min(5)
        .max(5)
        .required("Please enter activation code"),
});
const TripDetails = (props) => {

    const formikRef = useRef();

    const TriplogSchema = Yup.object().shape({
        TextLocation: Yup.string().min(4).required("Please enter Pickup-Address"),
        TextDropoffAddress: Yup.string().required("Please enter Drop-off-Address"),
        TextAccountNo: Yup.string().min(4).required("Please enter Account Number"),
        TextTelephone: Yup.string().min(10),

    });

    const [device_id, setDeviceId] = useState('');
    const [editable, setEditable] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [shareallowed, setShareallowed] = useState(false);
    const [accountnos, setAccountNo] = useState(props.currentBooking.account_setting);
    const [tripLog, setTripLog] = useState(props.currentBooking.Triplog);

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

    const handleSubmit = () => {

    }
    const fareEstimate = () => {

    }
    const getFare = () => {

    }
    const initall = () => {
        setAccountNo(props.currentBooking.account_setting);
        setTripLog(props.currentBooking.Triplog);

        if (tripLog.send_order == 'all') {
            if ((tripLog.device_id).length > 0) {
                setDeviceId(tripLog.device_id);
            } else {
                setDeviceId("all");
            }
        } else {
            if ((tripLog.device_id).length > 0) {
                setDeviceId(tripLog.device_id);
            } else {
                setDeviceId("");
            }
        }
        if (tripLog.status == 0 || tripLog.status == 1 || tripLog.status == 3) {
            setEditable(false);
        } else {
            setEditable(true);
        }
        if (tripLog.status == 0) {
            setEditable(false);
        } else {
            setEditable(true);
        }

        if (tripLog.is_uber == 1) {
            setSelectedOption('uber');
        } else if (tripLog.is_uber == 0 && (tripLog.car_no).length > 0 && tripLog.car_no != "Car #") {
            setSelectedOption(tripLog.device_id);
        } else if (tripLog.send_order == 'all' && tripLog.call_type != 'NET') {
            setSelectedOption('all');
        } else if (tripLog.call_type == 'NET') {
            setSelectedOption('net');
        }
        setShareallowed(tripLog.share)
    }

    // useEffect(() => {
    //     initall()
    // }, []);
    return (
        <React.Fragment>
            <div className="modal d-block mymodal" tabIndex="-1" role="dialog">
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
                                                                <select name="device_id" className="form-control w-100" disabled={editable} defaultValue={selectedOption}>
                                                                    {userDetails.FleetDevices && userDetails.FleetDevices.map(el => (
                                                                        <option value={el.value} >{el.label}</option>
                                                                    ))}

                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">

                                                            <div className="form-group ">
                                                                <label className="form_lbl">Cat Type: </label>
                                                                <select className="form-control w-100" defaultValue={userDetails.DefaultCarType}>
                                                                    <option value="" >Car Type</option>
                                                                    {userDetails.CarType && userDetails.CarType.map(el => (
                                                                        <option >{el.label}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Date: </label>
                                                                <Field
                                                                    name="pickup_time"
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Time: </label>
                                                                <Field
                                                                    name="TextPickupTime"
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
                                                                    id="pickupaddress"
                                                                    placeholder="Pick-up-Address"
                                                                    name="TextLocation"
                                                                    className="form-control autoCompleteAddress"

                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pick Up Address2: </label>
                                                                <Field
                                                                    id="pickupaddress2"
                                                                    placeholder="Pick-up-Address"
                                                                    name="TextLocation"
                                                                    className="form-control autoCompleteAddress"

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Drop off Address: </label>
                                                                <Field
                                                                    name="TextDropoffAddress"
                                                                    id="dropofaddress"
                                                                    placeholder="drop-off-Address"
                                                                    className="form-control autoCompleteAddress"

                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Drop off Address2: </label>
                                                                <Field
                                                                    name="TextDropoffAddress2"
                                                                    id="dropofaddress"
                                                                    placeholder="Please Enter Drop-off-Address"
                                                                    className="form-control autoCompleteAddress"

                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Pickup Cross Street: </label>
                                                                <Field
                                                                    placeholder="Please Enter Pickup Cross Street"
                                                                    name="TextDropoffCrossStreet"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Drop Cross Street2: </label>
                                                                <Field
                                                                    name="TextDropoffCrossStreet2"
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
                                                                    name="passenger"
                                                                    placeholder="Please Enter Passenger Name "
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Number of Passengers : </label>

                                                                <select className="form-control w-100" defaultValue={userDetails.DefaultCarType}>

                                                                    <option >1</option>
                                                                    <option >2</option>
                                                                    <option >3</option>
                                                                    <option >4</option>
                                                                    <option >5</option>
                                                                    <option >6</option>

                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Dispatch Time : </label>
                                                                <Field
                                                                    name="dispatchtime"
                                                                    placeholder="Please Enter Dispatch Time "
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
                                                                    name="AccountNo"
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
                                                        <div className="col-md-4">
                                                            <div className="form-group ">
                                                                <label className="form_lbl">Voucher No : </label>
                                                                <Field
                                                                    id="w3review" 
                                                                    name="w3review" 
                                                                    rows="4" 
                                                                    cols="50"
                                                           
                                                                    placeholder="Please Enter stop"
                                                               
                                                                />
                                                            </div>
                                                        </div>
                                                       
                                                        <div className="form-group col-md-12">
                                                            <label className="form_lbl">&nbsp; </label>

                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                onClick={() => props.saveNetEditBooking()}
                                                                to={``}
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


                                                        {/* <Field
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
                                                            /> */}

                                                        {/* <br />

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
                                                                    {errors.TextTelephone} */}
                                                        {/* </div>
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
                                                        </div> */}



                                                        {/* <div className="col-2 pr-0">
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
                                                                onClick={() => getFare()}
                                                                to={``}
                                                            >
                                                                Get Fare
                                                            </Button>



                                                            <Button
                                                                className="border btn btn-success text-capitalize ml-1"
                                                                type="submit"
                                                            >
                                                                Save
                                                            </Button> */}
                                                        {/* </div> */}
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

