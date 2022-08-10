import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import moment from "moment";
import { optSchema } from "./ValidationSchema/TriplogSchema";
import GoogleMaps from "./CommonTriplog/GoogleMaps";
import { useRef } from "react";
import PickupAddress from "../Pickers/PickupAddress";
import * as TriplogServices from "../../services/TriplogService";

const EditTripDetails = (props) => {
  const formikRef = useRef();
  const [cordinates, setCordinates] = useState({
    pickup_lat: "",
    pickup_lng: "",
    dropoff_lat: "",
    dropoff_lng: "",
  });
  const [device_id, setDeviceId] = useState("");
  const [editable, setEditable] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [submiting, setSubmitting] = useState(false);
  const [shareallowed, setShareallowed] = useState(false);
  const [accountnos, setAccountNo] = useState(
    props.currentBooking.account_setting
  );
  const [tripLog, setTripLog] = useState(props.currentBooking.Triplog);

  console.log(tripLog, "hey");

  const { user, userDetails } = useSelector((state) => {
    return {
      user: state.auth,
      userDetails: state.auth.userDetails,
    };
  });



  let edit_initial_values = {
    pickup_date:tripLog.pickup_date,
    pickup_time:tripLog.pickup_time,
    telephone: tripLog.telephone,
    device_id: tripLog.device_id,
    car_no:tripLog.car_no,
    cab_name:tripLog.cab_name,
    id:tripLog.id,
    passenger_name: tripLog.passenger_name,
    dispatch_time: tripLog.dispatch_time,
    pickup_address: tripLog.pickup_address,
    dropoff_address: tripLog.dropoff_address,
    dropoff_lng: tripLog.dropoff_lng,
    dropoff_lat: tripLog.dropoff_lat,
    pickup_lat: tripLog.pickup_lat,
    pickup_lng: tripLog.pickup_lng,
    amt_of_passengers: "",
    fare: tripLog.fare,
    tip: tripLog.tip,
    toll: tripLog.toll,
    wait_time: tripLog.wait_time,
    stops: tripLog.stops,
    misc: tripLog.misc,
    amt_of_passengers: "",
    account_no: "",
    job_no: tripLog.job_no,
    dispacher_note: tripLog.dispacher_note,
  }

  const initall = () => {
    setAccountNo(props.currentBooking.account_setting);
    setTripLog(props.currentBooking.Triplog);

    if (tripLog.send_order == "all") {
      if (tripLog.device_id.length > 0) {
        setDeviceId(tripLog.device_id);
      } else {
        setDeviceId("all");
      }
    } else {
      if (tripLog.device_id.length > 0) {
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
      setSelectedOption("uber");
    } else if (
      tripLog.is_uber == 0 &&
      tripLog.car_no.length > 0 &&
      tripLog.car_no != "Car #"
    ) {
      setSelectedOption(tripLog.device_id);
    } else if (tripLog.send_order == "all" && tripLog.call_type != "NET") {
      setSelectedOption("all");
    } else if (tripLog.call_type == "NET") {
      setSelectedOption("net");
    }
    setShareallowed(tripLog.share);
  };
  // tripLog.pickup_lat
  let pickupLat = tripLog.pickup_lat;
  let pickupLng = tripLog.pickup_lng;
  let dropoffLat = tripLog.dropoff_lat;
  let dropoffLng = tripLog.dropoff_lng;

  //
  useEffect(() => {
    initall();
  }, []);

  const EditTrip = async (values) => {
    console.log("api call", values);
    try {
      setSubmitting(true);

      const res = await TriplogServices.sendPushNotification(values);
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          // onSuccess(res.data);
        }
        return;
      }
      // onError(res.data.message);
    } catch (err) {
      setSubmitting(false);
      // onError();
    }
  };

  return (
    <React.Fragment>
      <div className="modal d-block mymodal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="align-items-center justify-content-center position-relative">
              <div className="modal-header">
                <h5 className="modal-title">Edit Trip</h5>
                <button
                  type="button"
                  className="close-btn btn-close font-weight-cold"
                  onClick={() => {
                    props.SetShowEditTrip(false);
                  }}
                >
                  X
                </button>
              </div>
              <div className="modal-body py-3">
                <div className="col-12">
                  <Formik
                    innerRef={formikRef}
                    initialValues={edit_initial_values}
                    className="form-horizontal"
                    validationSchema={optSchema}
                    onSubmit={(values) => {
                      //handleSubmit(values);
                    }}
                  >
                    {({ setFieldValue, values, submitForm, handleChange }) => (
                      <>
                        {tripLog.dispacher_id ==
                          tripLog.parent_dispacher_id && (
                          <div className="row">
                            <div className="form-group col-md-4">
                              <label className="form_lbl">Car#: </label>
                              <select
                                name="device_id"
                                className="form-control w-100"
                              >
                                {userDetails.FleetDevices &&
                                  userDetails.FleetDevices.map((el) => (
                                    <option value={el.value}>{el.label}</option>
                                  ))}
                              </select>
                              <Field
                                name="is_edit_details"
                                type="hidden"
                                value="1"
                                onChange={(v) =>
                                  setFieldValue("is_edit_details", v)
                                }
                              />
                              <Field
                                name="id"
                                type="hidden"
                                value={tripLog.id}
                                onChange={(v) => setFieldValue("id", v)}
                              />
                              <Field
                                name="status"
                                type="hidden"
                                value={tripLog.status}
                                onChange={(v) => setFieldValue("status", v)}
                              />
                              <Field name="telephone_line" type="hidden" />
                            </div>

                            <div className="form-group col-md-4">
                              <label className="form_lbl">Pick Up Date: </label>

                              <Field
                                name="pickup_date"
                                type="text"
                                className="form-control"
                                value={moment(tripLog.pickup_date).format("L")}
                                onChange={(v) =>
                                  setFieldValue("pickup_date", v)
                                }
                              />
                            </div>

                            <div className="form-group col-md-4">
                              <label className="form_lbl">Pick Up time: </label>
                              <Field
                                name="pickup_time"
                                type="text"
                                className="form-control"
                                value={moment(
                                  tripLog.pickup_date +
                                    " " +
                                    tripLog.pickup_time
                                ).format("LT")}
                                onChange={(v) =>
                                  setFieldValue("pickup_time", v)
                                }
                              />
                            </div>

                            <div className="form-group col-md-6">
                              <div className="form-group col-md-12">
                                <label className="form_lbl">
                                  Pick Up Address:{" "}
                                </label>
                                <Field
                                  name="pickup_address"
                                  type="text"
                                  className="form-control"
                                  // component = {PickupAddress}
                                  // getPickupLatLng={getPickUp}
                                />
                                <Field name="pickup_lat" type="hidden" />
                                <Field name="pickup_lng" type="hidden" />
                              </div>

                              <div className="form-group col-md-12">
                                <label className="form_lbl">
                                  Drop off Address:{" "}
                                </label>

                                <Field
                                  name="dropoff_address"
                                  type="text"
                                  className="form-control"
                                />
                                <Field name="dropoff_lat" type="hidden" />
                                <Field name="dropoff_lng" type="hidden" />
                              </div>

                              <div className="form-group col-md-12">
                                <label className="form_lbl">
                                  Telephone number:{" "}
                                </label>

                                <Field
                                  name="telephone"
                                  type="text"
                                  className="form-control"
                                  value={values.telephone}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">
                                  Passenger Name:{" "}
                                </label>

                                <Field
                                  name="passenger_name"
                                  type="text"
                                  className="form-control"
                                  value={values.passenger_name}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">
                                  Dispatch Time:{" "}
                                </label>

                                <Field
                                  name="dispatch_time"
                                  type="time"
                                  className="form-control"
                                  value={values.dispatch_time}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">
                                  Number of Passengers:{" "}
                                </label>

                                <select
                                  name="amt_of_passengers"
                                  className="form-control w-100"
                                  onChange={(v) =>
                                    setFieldValue(
                                      "amt_of_passengers",
                                      v.target.value
                                    )
                                  }
                                  defaultValue={tripLog.amt_of_passengers}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                </select>
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">Fare: </label>

                                <Field
                                  type="text"
                                  name="fare"
                                  className="form-control"
                                  value={values.fare}
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label className="form_lbl">Tip: </label>

                                <Field
                                  name="tip"
                                  type="text"
                                  className="form-control"
                                  value={values.tip}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">Tolls: </label>

                                <Field
                                  name="toll"
                                  type="text"
                                  className="form-control"
                                  value={values.toll}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">Wait time: </label>

                                <Field
                                  name="wait_time"
                                  type="text"
                                  className="form-control"
                                  value={values.wait_time}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">Stops: </label>

                                <Field
                                  name="stops"
                                  type="text"
                                  className="form-control"
                                  value={values.stops}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">Misc: </label>

                                <Field
                                  name="misc"
                                  type="text"
                                  className="form-control"
                                  value={values.misc}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">Account No: </label>

                                <select
                                  name="account_no"
                                  className="form-control w-100"
                                  onChange={(v) =>
                                    setFieldValue("account_no", v.target.value)
                                  }
                                  defaultValue={tripLog.account_no}
                                >
                                  {accountnos &&
                                    Object.keys(accountnos).map((i) => (
                                      <option value={i}>{accountnos[i]}</option>
                                    ))}
                                </select>
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">Voucher No: </label>

                                <Field
                                  name="job_no"
                                  type="text"
                                  className="form-control"
                                  value={values.job_no}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form_lbl">Notes: </label>

                                <Field
                                  name="dispacher_note"
                                  type="textarea"
                                  className="form-control"
                                  value={values.dispacher_note}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-6">
                              <GoogleMaps
                                latlng={{
                                  pickupLat,
                                  pickupLng,
                                  dropoffLat,
                                  dropoffLng,
                                }}
                                status={props.currentBooking.Triplog.status}
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label className="form_lbl">
                                Sharing Allowed:{" "}
                              </label>

                              <Field
                                type="checkbox"
                                name="sharing_allowed"
                                checked={values.sharing_allowed ? true : false}
                                defaultChecked={shareallowed ? true : false}
                                onChange={(v) =>
                                  setFieldValue(
                                    "sharing_allowed",
                                    v.target.checked ? 1 : 0
                                  )
                                }
                              />
                            </div>

                            <div className="form-group col-md-12">
                              <label className="form_lbl">&nbsp; </label>

                              <Button
                                className="border btn btn-success text-capitalize ml-1"
                                onClick={() => props.processNoShow()}
                                to={``}
                              >
                                {" "}
                                No Show
                              </Button>
                              <Button
                                className="border btn btn-success text-capitalize ml-1"
                                onClick={() => EditTrip(values)}
                              >
                                {" "}
                                Save
                              </Button>
                              <Button
                                className="border btn btn-success text-capitalize ml-1"
                                onClick={() => {
                                  props.SetShowEditTrip(false);
                                }}
                                to={``}
                              >
                                {" "}
                                Close
                              </Button>
                            </div>
                          </div>
                        )}
                        {tripLog.dispacher_id !=
                          tripLog.parent_dispacher_id && (
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label className="form_lbl">Pick Up Date: </label>
                              <div className="form_lbl">
                                {moment(tripLog.pickup_date).format("L")}
                              </div>

                              <Field
                                name="id"
                                type="hidden"
                                value={tripLog.id}
                                onChange={(v) => setFieldValue("id", v)}
                              />
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Pick Up time: </label>
                              <div className="form_lbl">
                                {moment(
                                  tripLog.pickup_date +
                                    " " +
                                    tripLog.pickup_time
                                ).format("LT")}
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">
                                Pick Up Address:{" "}
                              </label>
                              <div className="form_lbl">
                                {tripLog.pickup_address}
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">
                                Drop off Address:{" "}
                              </label>
                              <div className="form_lbl">
                                {tripLog.dropoff_address}
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">
                                Telephone number:{" "}
                              </label>
                              <div className="form_lbl">
                                {tripLog.telephone}
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">
                                Passenger Name:{" "}
                              </label>
                              <div className="form_lbl">
                                {tripLog.passenger_name}
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">
                                Number of Passengers:{" "}
                              </label>
                              <div className="form_lbl">
                                {tripLog.amt_of_passengers}
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Fare: </label>
                              <div className="form_lbl">{tripLog.fare}</div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Tip: </label>
                              <div className="form_lbl">{tripLog.tip}</div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Tolls: </label>
                              <div className="form_lbl">{tripLog.toll}</div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Wait time: </label>
                              <div className="form_lbl">
                                {tripLog.wait_time}
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Stops: </label>
                              <div className="form_lbl">{tripLog.stops}</div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Misc: </label>
                              <div className="form_lbl">{tripLog.misc}</div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Account No: </label>
                              <div className="form_lbl">
                                {tripLog.account_no}
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Voucher No: </label>
                              <div className="form_lbl">{tripLog.job_no}</div>
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Price: </label>

                              <Field
                                name="price"
                                type="text"
                                className="form-control"
                                value={tripLog.price}
                                onChange={(v) => setFieldValue("price", v)}
                              />
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">Notes: </label>

                              <Field
                                name="details"
                                type="textarea"
                                className="form-control"
                                value={tripLog.details}
                                onChange={(v) => setFieldValue("details", v)}
                              />
                            </div>

                            <div className="form-group col-md-6">
                              <label className="form_lbl">My Notes: </label>

                              <Field
                                name="dispacher_note"
                                type="text"
                                className="form-control"
                                value={values.dispacher_note}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="form-group col-md-12">
                              <label className="form_lbl">&nbsp; </label>

                              <Button
                                className="border btn btn-success text-capitalize ml-1"
                                onClick={() => props.saveNetEditBooking()}
                                to={``}
                              >
                                {" "}
                                Save
                              </Button>
                              <Button
                                className="border btn btn-success text-capitalize ml-1"
                                onClick={() => {
                                  props.SetShowEditTrip(false);
                                }}
                                to={``}
                              >
                                {" "}
                                Close
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
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

export default EditTripDetails;
