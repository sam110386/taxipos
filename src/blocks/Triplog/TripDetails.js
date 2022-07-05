import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  createContext,
} from "react";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import * as TriplogServices from "../../services/TriplogService";
import {
  TriplogSchema,
  TripDetails_initial_Values,
} from "./ValidationSchema/TriplogSchema";
import PickupAddress from "../Pickers/PickupAddress";
import DropoffAddress from "../Pickers/DropoffAddress";
import MaskedInput from "react-text-mask";
import { CreateTrip } from "./CommonTriplog/CreateTrip";
import { NotificationPicker } from "../Pickers/NotificationPicker";
import GoogleMaps from "./CommonTriplog/GoogleMaps";



const TripDetails = (props) => {
  const formikRef = useRef();
  const [superState, setSuperState] = useState({
    CurrentPickupTime: "",
    CurrentDate: "",
    Triplist: "",
    pickupLat: "",
    pickupLng: "",
    pickupLat2: "",
    pickupLng2: "",
    dropoffLat: "",
    dropoffLng: "",
    dropoffLat2: "",
    dropoffLng: "",
  });

  const [CurrentPickupTime, setCurrentPickupTime] = useState(0);
  const [CurrentDate, setCurrentDate] = useState(0);
  const [Triplist, setTriplist] = useState([]);
  const [pickupLat, setPickupLat] = useState("");
  const [pickupLng, setPickupLng] = useState("");
  const [dropoffLat, setDropoffLat] = useState("");
  const [dropoffLng, setDropoffLng] = useState("");

  const { user, userDetails } = useSelector((state) => {
    return {
      user: state.auth,
      userDetails: state.auth.userDetails,
    };
  });

  const getPickupLatLng = (pickupAddressLat, pickupAddressLng) => {
    setPickupLat(pickupAddressLat);
    setPickupLng(pickupAddressLng);
  };
  const getDropoffLatLng = (dropofAddressLat, dropofAddressLng) => {
    setDropoffLat(dropofAddressLat);
    setDropoffLng(dropofAddressLng);
  };

  useEffect(() => {
    formikRef.current.setFieldValue("pickup_time", CurrentPickupTime);
    formikRef.current.setFieldValue("pickup_date", CurrentDate);
  }, [CurrentPickupTime, CurrentDate]);

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("pickup_lat", pickupLat);
      formikRef.current.setFieldValue("pickup_date", CurrentDate);
      formikRef.current.setFieldValue("pickup_lng", pickupLng);
      formikRef.current.setFieldValue("dropoff_lat", dropoffLat);
      formikRef.current.setFieldValue("dropoff_lng", dropoffLng);
    }
  }, [pickupLat, pickupLng, dropoffLat, dropoffLng, CurrentDate]);

  const handleSubmit = async (values) => {
    CreateTrip(values).then((e) => {
      if (e === 1) {
        props.SetShowTrip(false);
      }
    });
  };
  const fareEstimate = () => {};
  const getFare = () => {};

  const onError = (message) => {
    //setError(true);
  };

  const initialize = () => {
    updateCurrentTime();
    loadTripList();
  };
  const updateCurrentTime = async () => {
    try {
      const res = await TriplogServices.getCurrentDateTime();
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          setCurrentPickupTime(res.data.time);
          setCurrentDate(res.data.date);
          setInterval(async () => {
            try {
              const res = await TriplogServices.getCurrentDateTime();
              if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                  setCurrentPickupTime(res.data.time);
                  setCurrentDate(res.data.date);
                  return;
                }
              }
            } catch (err) {
              onError();
            }
          }, 60000);
        }
        onError(res.data.message);
      }
    } catch (err) {
      onError();
    }
  };
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
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <React.Fragment>
        <div
          className="modal d-block mymodal tripModal"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog detailsmodal" role="document">
            <div className="modal-content">
              <div className="align-items-center justify-content-center position-relative">
                <div className="modal-header">
                  <h5 className="modal-title">Enter Trip Details</h5>
                  <img
                    src="/images/b_drop.png"
                    onClick={() => {
                      props.SetShowTrip(false);
                    }}
                    className="rmbtn"
                    alt="Cancel"
                  />
                </div>
                <div className="modal-body py-3">
                  <div className="col-12">
                    <Formik
                      innerRef={formikRef}
                      initialValues={TripDetails_initial_Values}
                      validationSchema={TriplogSchema}
                      onSubmit={(values,{resetForm}) => {
                        handleSubmit(values);
                        resetForm()
                      }}
                    >
                      {({ errors, touched, setFieldValue }) => (
                        <Form>
                          <>
                            <div className="row d-flex justify-content-left pl-0 pr-0 text-center">
                              <div className="col-md-2">
                                <div className="form-group ">
                                  <label className="form_lbl">Car#: </label>
                                  <Field
                                    as="select"
                                    name="car_no"
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const filtered = userDetails.FleetDevices.filter(
                                        (data) => data.value === value
                                      );
                                      setFieldValue(
                                        "car_no",
                                        filtered[0].value
                                      );
                                      setFieldValue(
                                        "device_id",
                                        filtered[0].label
                                      );
                                    }}
                                    className="form-control w-100"
                                  >
                                    {userDetails.FleetDevices &&
                                      userDetails.FleetDevices.map((el) => (
                                        <option value={el.value}>
                                          {el.label}
                                        </option>
                                      ))}
                                  </Field>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group ">
                                  <label className="form_lbl">Cat Type: </label>
                                  <Field
                                    as="select"
                                    name="cab_name"
                                    className="form-control w-100"
                                  >
                                    <option value="">Car Type</option>
                                    {userDetails.CarType &&
                                      userDetails.CarType.map((el) => (
                                        <option>{el.label}</option>
                                      ))}
                                  </Field>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group ">
                                  <label className="form_lbl">
                                    Pick Up Date:{" "}
                                  </label>
                                  <Field
                                    name="pickup_date"
                                    type="date"
                                    className="form-control"
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group ">
                                  <label className="form_lbl">
                                    Pick Up Time:{" "}
                                  </label>
                                  <Field
                                    name="pickup_time"
                                    className="form-control"
                                    render={({ field }) => (
                                      <MaskedInput
                                        {...field}
                                        mask={[
                                          /^([0-2])/,
                                          /([0-9])/,
                                          ":",
                                          /[0-5]/,
                                          /[0-9]/,
                                          " ",
                                          /([AaPp])/,
                                          /([Mm])/,
                                        ]}
                                        type="text"
                                        className="form-control"
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group ">
                                  <label className="form_lbl">
                                    Number of Passengers :{" "}
                                  </label>

                                  <Field
                                    as="select"
                                    name="amt_of_passengers"
                                    className="form-control w-100"
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                  </Field>
                                </div>
                              </div>

                              <div className="col-md-2">
                                <div className="form-group ">
                                  <label className="form_lbl">
                                    Notification:{" "}
                                  </label>
                                  <Field
                                    component={NotificationPicker}
                                    name="direct_notification_time"
                                    id="direct_notification_time"
                                    placeholder="Notification"
                                    className="form-control"
                                    autoComplete="off"
                                  />
                                </div>
                              </div>

                              <div className="col-md-6 nopadding">
                                <div className="col-md-12">
                                  <div className="form-group ">
                                    <label className="form_lbl">
                                      Pick Up Address:{" "}
                                    </label>
                                    <Field
                                      component={PickupAddress}
                                      getPickupLatLng={getPickupLatLng}
                                      name="pickup_address"
                                      id="pickupaddressid"
                                      placeholder="Pick-up-Address"
                                      autoComplete="off"
                                      className={`form-control ${
                                        touched.pickup_address &&
                                        errors.pickup_address
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    />
                                    <Field name="pickup_lat" type="hidden" />
                                    <Field name="pickup_lng" type="hidden" />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group ">
                                    <label className="form_lbl">
                                      Drop off Address:{" "}
                                    </label>
                                    <Field
                                      component={DropoffAddress}
                                      getDropoffLatLng={getDropoffLatLng}
                                      name="dropoff_address"
                                      id="dropofaddressid"
                                      placeholder="drop-off-Address"
                                      autoComplete="off"
                                      className={`form-control ${
                                        touched.dropoff_address &&
                                        errors.dropoff_address
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">
                                      Passenger Name :{" "}
                                    </label>
                                    <Field
                                      name="passenger_name"
                                      placeholder="Please Enter Passenger Name "
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">
                                      Telephone :{" "}
                                    </label>
                                    <Field
                                      placeholder="Please Enter Telephone Number"
                                      name="telephone"
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">
                                      Dispatch Time :{" "}
                                    </label>
                                    <Field
                                      name="dispatchTime"
                                      placeholder="Please Enter Dispatch Time "
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">Fare : </label>
                                    <Field
                                      name="fare"
                                      placeholder="Please Enter Tip "
                                      autoComplete="off"
                                      className={`form-control ${
                                        touched.fare && errors.fare
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    />
                                  </div>
                                </div>

                                <div className="col-md-3 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">Tip : </label>
                                    <Field
                                      name="tip"
                                      placeholder="Please Enter Fare "
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">Tolls : </label>
                                    <Field
                                      name="tolls"
                                      placeholder="Please Enter tolls "
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">
                                      Wait Time :{" "}
                                    </label>
                                    <Field
                                      name="waittime"
                                      placeholder="Please Enter wait Time "
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">Stops : </label>
                                    <Field
                                      name="Stops"
                                      placeholder="Please Enter stop "
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">Misc : </label>
                                    <Field
                                      name="Misc"
                                      placeholder="Please Enter Misc "
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">
                                      Account No :{" "}
                                    </label>
                                    <Field
                                      name="account_no"
                                      placeholder="Please Enter Account Number "
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3 pull-left">
                                  <div className="form-group ">
                                    <label className="form_lbl">
                                      Voucher No :{" "}
                                    </label>
                                    <Field
                                      name="VoucherNo"
                                      placeholder="Please Enter stop "
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12  ">
                                  <div className="form-group">
                                    <label className="form_lbl">Notes : </label>
                                    <Field
                                      id="notes"
                                      name="notes"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <GoogleMaps
                                  latlng={{
                                    pickupLat,
                                    pickupLng,
                                    dropoffLat,
                                    dropoffLng,
                                  }}
                                />
                              </div>

                              {/*                          
                            <div className="col-md-4  text-center"></div>
                           
                            <div className="col-md-4  text-center"></div> */}
                              <div className="col-md-3 mt-1  text-left">
                                Make this round trip :
                              </div>

                              <div className="col-md-3 text-left  ">
                                <div>
                                  <Field
                                    type="checkbox"
                                    name="roundtrip"
                                    value="1"
                                  />
                                  (It will work if correct drop off address
                                  entered)
                                </div>
                              </div>

                              <div className="col-md-6 text-center">
                                Sharing Allowed
                                <Field type="checkbox" name="share" value="1" />
                              </div>
                              <div className="col-md-3 text-left mt-4">
                                <div>
                                  Copy Same Trip For Date Range With Days:
                                </div>
                              </div>

                              <div className="col-md-3  mt-4">
                                <div>
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
                                  name="multidayrange[multildayend]"
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-3 mt-4">
                                <div>
                                  (It will work if correct pickup address
                                  entered)
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
                                >
                                  {" "}
                                  Save
                                </Button>
                                <Button
                                  className="border btn btn-success text-capitalize ml-1"
                                  onClick={() => {
                                    props.SetShowTrip(false);
                                  }}
                                  to={``}
                                >
                                  {" "}
                                  Close
                                </Button>
                                <Button
                                  className="border btn btn-success text-capitalize ml-1"
                                  onClick={() => {
                                    props.SetShowTrip(false);
                                  }}
                                  to={``}
                                >
                                  {" "}
                                  Fare Estimate
                                </Button>
                                <Button
                                  className="border btn btn-success text-capitalize ml-1"
                                  onClick={() => {
                                    props.SetShowTrip(false);
                                  }}
                                  to={``}
                                >
                                  {" "}
                                  Get Fare
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
