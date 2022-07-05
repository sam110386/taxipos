import React, { useEffect, useState, useRef } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector } from "react-redux";
import * as TriplogServices from "../../services/TriplogService";
import { Button } from "@material-ui/core";
import Trips from "./TripList";
import EditTripDetails from "./EditTripDetails";
import toast from "react-hot-toast";
import TripDetails from "./TripDetails";
import CallerIdInfo from "./CallerIdInfo";
import Chatsidebar from "./Chatsidebar";
import { TriplogSchema } from "./ValidationSchema/TriplogSchema";
import { CreateTrip } from "./CommonTriplog/CreateTrip";
import PickupAddress from "../Pickers/PickupAddress";
import DropoffAddress from "../Pickers/DropoffAddress";
import MaskedInput from "react-text-mask";
import { NotificationPicker } from "../Pickers/NotificationPicker";
import { CarNumberPicker } from "../Pickers/CarNumberPicker";
import { store } from "../../store/store";
import {
  loadTripListDataSuccess,
  loadTripListUpdate,
  loadTripListDataRemove,
} from "../../store/actions/TripAction";
import { initial_Values } from "./ValidationSchema/TriplogSchema";
import * as CarService from "../../services/CarService";
import { FullPageLoader } from "../Loaders";
import TelephoneVerfiy from "./Components/TelephoneVerfiy";
import { usePubNub } from "pubnub-react";
import { useDispatch } from "react-redux";

const TriplogWrap = (props) => {
  const { userDetails, tripList } = useSelector((mainState) => {
    return {
      userDetails: mainState.auth.userDetails,
      tripList: mainState.trip.tripList,
    };
  });
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [submiting, setSubmitting] = useState(false);
  const [showEditTrip, SetShowEditTrip] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentBooking, SetCurrentBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainState, setMainState] = useState({
    btndisable: false,
    CurrentPickupTime: null,
    CurrentDate: 0,
    currentBooking: [],
    fareInput: "",
    pickupLat: "",
    pickupLng: "",
    dropoffLat: "",
    dropoffLng: "",
    deviceId: "",
    carNumber: "",
    tpnum: "",
  });
  const pubnub = usePubNub();

  const [channels] = useState([
    `PCAPP_${userDetails.DispatcherId}`,
    // `CTGPCAPP_${userDetails.DispatcherId}`,
  ]);

 



  const handleMessage = (event) => {
    const message = event.message;


    var TripId = message.tripid;
    if (message.messageType == "cancelTripWeb") {
      // $("table#tripLogTable tr#tripRow" + TripId).remove();
      // return;
      //store.dispatch(loadTripListDataRemove(res.data.result));
      const tripids = Object.keys(tripList).filter((key, index) => {
        const data = tripList[key].DispatcherTrip.trip_id !== TripId;
        return data;
      });
      const filteredTrips = Object.keys(tripList)
        .filter((key) => tripids.includes(key))
        .reduce((obj, key) => {
          obj[key] = tripList[key];
          return obj;
        }, {});
      dispatch(loadTripListDataRemove(filteredTrips));
    }
    if (message.status == "3") {
      // $("table#tripLogTable tr#tripRow" + TripId).remove();
      // return;
      //store.dispatch(loadTripListDataRemove(res.data.result));
      const tripids = Object.keys(tripList).filter((key, index) => {
        const data = tripList[key].DispatcherTrip.trip_id !== TripId;
        return data;
      });
      const filteredTrips = Object.keys(tripList)
        .filter((key) => tripids.includes(key))
        .reduce((obj, key) => {
          obj[key] = tripList[key];
          return obj;
        }, {});
      dispatch(loadTripListDataRemove(filteredTrips));
    }
    if (message.messageType == "Add") {
      reloadTripDetails(TripId);
    }
    if (message.messageType == "Edit") {
      reloadTripDetails(TripId);
    }
    if (message.messageType == "statusUpdate") {
      reloadTripDetails(TripId);
    }
    if (message.messageType == "award") {
      reloadTripDetails(TripId);
    }
    if (message.messageType == "callerid") {
      LoadCallorInfoTripLog();
    }
  };

  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels/*, withPresence: true */});
  }, [pubnub, channels]);

  const reloadTripDetails = async (id, type) => {
    let res = await CarService.reloadTripDetails({ TripId: id });
    if (res && res.status === 200) {
      if (res.data && res.data.status === 1) {
        store.dispatch(loadTripListUpdate(res.data.result));
      }
    }
  };
  const LoadCallorInfoTripLog = async () => {
    try {
      setLoading(true);
      const res = await TriplogServices.loadCallerInfoTriplog();
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          // setCallerTripInfo(res.data.result.phone_data)
          setLoading(false);
        }
        onError(res.data.message);
      }
    } catch (err) {
      setLoading(false);
      onError();
    }
  };

  const sendInfoToAffiliatetriplog = async (
    car_no,
    device_id,
    id,
    status,
    call_type_line
  ) => {
    var call_type = "";
    if (status === "deactivated") {
      toast.error("Car # " + car_no + " is Deactivated. Speak to Management.");
      return false;
    }
    if (status === "not_found") {
      toast.error("Car # " + car_no + " does not exist.");
      return false;
    }
    if (status === "not_booked") {
      toast.error("Car # " + car_no + " is not booked in.");
      return false;
    }
    if (status === "no_lined_device") {
      toast.error("No lined device found.");
      return false;
    } else if (status === "lined_device") {
      call_type = call_type_line;
    }
    if (status === "net_activated") {
      call_type = "NET";
    }
    var params = { id, device_id, car_no, call_type };
    let res = await CarService.reassignAffiliate(params);
    if (res && res.status === 200) {
      if (res.data && res.data.status === 1) {
        reloadTripDetails(id, "update");
      }
    }
  };
  const gettelenum = (num) => {
    // console.log(num);
  };
  // const sendInfoToCar_triplog = async(car_no, device_id, id, status, call_type_line)=> {

  //     var call_type = '';
  //     if (status === "deactivated") {
  //         setSelectedOpt('')
  //         // $("#" + id + "").focus();
  //         alert("Car # " + car_no + " is Deactivated. Speak to Management.");
  //         return false;
  //     }
  //     if (status === "not_found") {
  //         setSelectedOpt('')
  //         // $("#" + id + "").focus();
  //         alert("Car # " + car_no + " does not exist.");
  //         return false;
  //     }
  //     if (status === "not_booked") {
  //         setSelectedOpt('')
  //         // $("#" + id + "").focus();
  //         alert("Car # " + car_no + " is not booked in.");
  //         return false;
  //     }
  //     if (status === "no_lined_device") {
  //         setSelectedOpt('')
  //         // $("#" + id + "").focus();
  //         alert("No lined device found.");
  //         return false;
  //     } else if (status === "lined_device") {
  //         setSelectedOpt('')
  //         call_type = call_type_line;
  //     }
  //     if (status === "net_activated") {
  //         setSelectedOpt('')
  //         // $("#" + id + "").focus();
  //         call_type = 'NET';

  //     }
  //     if (status === "auto_activated") {
  //         setSelectedOpt('')
  //         // $("#" + id + "").focus();
  //         call_type = '';

  //     }

  //     var params = { id, device_id, car_no,call_type }
  //     // $("#" + id + "").removeClass('focused');
  //     // $("#" + id + "").blur();
  //     let res = await CarService.carAssignment(params)
  //     // console.log(res,"myres")
  //     // $.ajax({
  //     //     url: SITE_URL + "dispachers/send_push_notification_direct",
  //     //     type: "post",
  //     //     data: params,
  //     //     async: false,
  //     //     success: function (data) {

  //     //     }
  //     // });
  // }

  const initialize = () => {
    updateCurrentTime();
    loadTripList();
  };

  const updateCurrentTime = async () => {
    try {
      const res = await TriplogServices.getCurrentDateTime();
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          setMainState({
            ...mainState,
            CurrentPickupTime: res.data.time,
            CurrentDate: res.data.date,
          });
          setInterval(async () => {
            try {
              const res = await TriplogServices.getCurrentDateTime();
              if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                  setMainState({
                    ...mainState,
                    CurrentPickupTime: res.data.time,
                    CurrentDate: res.data.date,
                  });
                }
              }
            } catch (err) {
              onError();
            }
          }, 60000);
          return;
        }
      }
    } catch (err) {
      onError();
    }
  };
  const loadTripList = async () => {
    try {
      const res = await TriplogServices.getTriplist({});

      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          let ret = {};
          res.data.result.map((ele, i) => {
            ret[ele.Triplog.id] = ele;
          });

          store.dispatch(loadTripListDataSuccess(ret));

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

  const getPickupLatLng = (pickupLat, pickupLng) => {
    setMainState({ ...mainState, pickupLat, pickupLng });
  };
  const getDropoffLatLng = (dropoffLat, dropoffLng) => {
    setMainState({ ...mainState, dropoffLat, dropoffLng });
  };
  const getDeviceId = (carNumber) => {
    if (carNumber) {
      const details = userDetails.FleetDevices.filter(
        (data) => data.label === carNumber
      );
      setMainState({
        ...mainState,
        carNumber: details[0].label,
        deviceId: details[0].value,
      });
    }
  };

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue(
        "pickup_time",
        mainState.CurrentPickupTime
      );
      formikRef.current.setFieldValue("pickup_date", mainState.CurrentDate);
    }
  }, [mainState.CurrentPickupTime, mainState.CurrentDate]);

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("pickup_lat", mainState.pickupLat);
      formikRef.current.setFieldValue("pickup_lng", mainState.pickupLng);
      formikRef.current.setFieldValue("dropoff_lat", mainState.dropoffLat);
      formikRef.current.setFieldValue("dropoff_lng", mainState.dropoffLng);
    }
  }, [
    mainState.pickupLat,
    mainState.pickupLng,
    mainState.dropoffLat,
    mainState.dropoffLng,
  ]);

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("car_no", mainState.carNumber);
      formikRef.current.setFieldValue("device_id", mainState.deviceId);
    }
  }, [mainState.deviceId, mainState.carNumber]);

  const onError = (message) => {
    toast.error(message);
  };

  const handleSubmit = (values) => {
    setMainState({ ...mainState, btndisable: true });
    CreateTrip(values).then((e) => {
      setMainState({ ...mainState, btndisable: false });
    });
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
      return toast.error("Please Enter Pick-up-Address");
    } else if (!value.dropofAddress) {
      return toast.error("Please Enter Drop-of-Address");
    }
    try {
      setSubmitting(true);
      const res = await TriplogServices.getFare({
        orglatlng: `${value.pickupAddressLat},${value.pickupAddressLng}`,
        deslatlng: `${value.dropofAddressLat},${value.dropofAddressLng}`,
        orgadress: value.pickupAddress,
        desadress: value.dropofAddress,
        cab_type: value.cabName,
      });
      setSubmitting(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          setMainState({ ...mainState, fareInput: res.data.result.fare });
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
    setShowDetails(true);
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
    textTransform: "uppercase",
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

  return (
    <React.Fragment>
      <div>
        <fieldset className="pendingentries">
          <legend>Pending Entries</legend>
          <img
            src="/images/clear_button.png"
            alt="Clear"
            className="clearchatsidebar mb-1"
          />
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
            onSubmit={(values,{resetForm}) => {
              setTimeout(() => {
                handleSubmit(values);
                resetForm()
              }, 2000);
            }}
          >
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
                        component={PickupAddress}
                        getPickupLatLng={getPickupLatLng}
                        name="pickup_address"
                        id="pickupaddress"
                        autoComplete="off"
                        className={`form-control ${
                          touched.pickup_address && errors.pickup_address
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <Field name="pickup_lat" type="hidden" />
                      <Field name="pickup_lng" type="hidden" />
                      <br />
                      {errors.pickup_address && touched.pickup_address ? (
                        <div className="d-block invalid-feedback mt-n4 ml-3">
                          {errors.pickup_address}
                        </div>
                      ) : null}
                    </div>
                    <br />
                    <div className="col-1 pl-0">
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
                    <div className="col-2 pr-0 pl-0">
                      <Field
                        type="date"
                        name="pickup_date"
                        autoComplete="off"
                        className="form-control unstyled"
                      />
                    </div>
                    <div className="col-2">
                      <Field
                        component={NotificationPicker}
                        name="direct_notification_time"
                        placeholder="Notification"
                        id="direct_notification_time"
                        className="form-control"
                      />
                    </div>
                    <div className="col-1 pl-0">
                      <Field
                        name="telephone"
                        component={TelephoneVerfiy}
                        getTelenum={gettelenum}
                        placeholder="Telephone"
                        className="form-control"
                        autoComplete="off"
                        // onChange={(e) =>{
                        //   setMainState({...mainState,tpnum:e.target.value})
                        //   console.log(mainState.tpnum)
                        // }}
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
                        autoComplete="off"
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
                          <Field type="checkbox" name="TextShare" />
                          Sharing Allowed
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-left pl-0 pr-0 mt-3 ">
                    <div className="col-4">
                      <Field
                        component={DropoffAddress}
                        getDropoffLatLng={getDropoffLatLng}
                        name="dropoff_address"
                        id="dropofaddress"
                        autoComplete="off"
                        placeholder="drop-off-Address"
                        className={`form-control ${
                          touched.dropoff_address && errors.dropoff_address
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <Field name="dropoff_lat" type="hidden" />
                      <Field name="dropoff_lng" type="hidden" />
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
                        autoComplete="off"
                        className={`form-control ${
                          touched.fare && errors.fare ? "is-invalid" : ""
                        }`}
                      />
                    </div>

                    <div className="col-1 pr-0">
                      <Field
                        component={CarNumberPicker}
                        getDeviceId={getDeviceId}
                        className="form-control w-100"
                        name="carno"
                      />
                    </div>
                    <Field name="device_id" type="hidden" />
                    <Field name="car_no" type="hidden" />
                    <div className="col-2 pr-0">
                      <Field
                        as="select"
                        className="form-control w-100"
                        name="cab_name"
                      >
                        {userDetails.CarType
                          ? userDetails.CarType.map((el, ind) => (
                              <option key={ind.toString()} value={el.cab_name}>
                                {el.value}
                              </option>
                            ))
                          : null}
                      </Field>
                    </div>
                    <div className="col-4 pr-0">
                      {/* <Button
                        className="border btn btn-success text-capitalize"
                        onClick={() => fareEstimate()}
                        to={``}
                        style={{
                          borderRadius: 8,
                          backgroundColor: "#1c7be0d7",
                          padding: "7px 14px",
                          color: "white",
                          fontSize: "12px",
                        }}
                        variant="contained"
                      >
                        Fare Estimate
                      </Button> */}

                      {/* <Button
                        className="border btn btn-success text-capitalize ml-1"
                        // onClick={() => getFate({ pickupAddress, pickupLat, pickupLng, dropoffaddress, pickupLat, pickupLng, cabName })}
                        to={``}
                        style={{
                          borderRadius: 8,
                          backgroundColor: "#1c7be0d7",
                          padding: "7px 14px",
                          color: "white",
                          fontSize: "12px",
                        }}
                        variant="contained"
                      >
                        Get Fare
                      </Button> */}

                      <Button
                        className="border btn btn-success text-capitalize ml-1"
                        onClick={() => openDetails()}
                        to={``}
                        style={{
                          borderRadius: 8,
                          backgroundColor: "#1c7be0d7",
                          padding: "7px 14px",
                          color: "white",
                          fontSize: "12px",
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
                          fontSize: "12px",
                        }}
                        variant="contained"
                        disabled={mainState.btndisable && true}
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
        {
          <Trips
            openTripDetails={openTripDetails}
            sendInfoToAffiliatetriplog={sendInfoToAffiliatetriplog}
          />
        }
        {showEditTrip && (
          <EditTripDetails
            currentBooking={currentBooking}
            SetShowEditTrip={SetShowEditTrip}
            saveNetEditBooking={saveNetEditBooking}
            processNoShow={processNoShow}
            saveEditBooking={saveEditBooking}
          />
        )}
        {showDetails && <TripDetails SetShowTrip={setShowDetails} />}
      </div>
    </React.Fragment>
  );
};

export default TriplogWrap;
