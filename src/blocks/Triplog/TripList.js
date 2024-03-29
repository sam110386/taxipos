import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as TriplogServices from "../../services/TriplogService";
import { FullPageLoader } from "../Loaders";
import moment from "moment";
import toast from "react-hot-toast";
import { store } from "../../store/store";
import { loadTripListDataRemove } from "../../store/actions/TripAction";
import CarAutoComplete from "../Pickers/CarAutoComplete";
import CarValue from "../Pickers/CarValue";
import CarValueUnaccepted from "../Pickers/CarValueUnaccepted";

const TripList = (props) => {
  const [submiting, setSubmitting] = useState(false);
  const [tripAllList, setTripAllList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [UnacceptedCarValue, setUnacceptedCarValue] = useState("");

  const {
    userDetails,
    TriplogSetting,
    TriplogSettingFields,
    DispatcherId,
    trip,
  } = useSelector((state) => {
    return {
      userDetails: state.auth.userDetails,
      TriplogSetting: state.auth.userDetails.TriplogSetting,
      TriplogSettingFields: state.auth.userDetails.TriplogSettingFields,
      DispatcherId: state.auth.userDetails.DispatcherId,
      trip: state.trip.tripList,
    };
  });
  useEffect(() => {
    setTripAllList(trip);
  }, [trip]);
  const openTripDetails = async (trip, dispacher, el) => {
    props.openTripDetails(trip, dispacher, el);
  };
  const getTriplogColumn = (
    coulumn,
    trip,
    dispacherId,
    cssclass,
    back_class,
    idx
  ) => {
    let temp = "";
    let time_format = userDetails.TimeFormat;
    switch (coulumn) {
      case "fare_id":
        return (
          <td
            key={`fare_id${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["id"] != "" && dispacherId != "" ? "" : ""}
          </td>
        );
        break;
      case "car_no":
        if (trip["Triplog"]["dispacher_id"] != dispacherId) {
          setFlag(true);
        }
        if (
          trip["Triplog"]["car_no"].length != 0 &&
          trip["Triplog"]["car_no"] != "Car #"
        ) {
          if (trip["Triplog"]["status"] === 0) {
            let unacceptedCarValue;
            unacceptedCarValue = trip["Triplog"]["call_type"];
            if (trip["Triplog"]["car_no"].length != 0) {
              unacceptedCarValue = trip["Triplog"]["car_no"];
            }
            if (trip["Triplog"]["pending_car_no"].length != 0) {
              unacceptedCarValue = `P${trip["Triplog"]["pending_car_no"]}`;
            }
            setUnacceptedCarValue(unacceptedCarValue);
            let allowreassign =
              [1, 5].indexOf(trip["Triplog"]["status"]) > -1
                ? " allowreassign"
                : "";
            return (
              <td
                key={`car_no${trip["Triplog"]["id"]}`}
                className={`cntr_algn ${back_class} ${allowreassign}`}
                rel-tripid={trip["Triplog"]["id"]}
                rel-affiliate-dispacher={trip["Triplog"]["affiliate_accept"]}
                rel-parent-dispacher={trip["Triplog"]["parent_dispacher_id"]}
                rel-current-dispacher={dispacherId}
                hold={`NO`}
              >
                <CarValueUnaccepted
                  value={UnacceptedCarValue}
                  trip={trip}
                  dispacherId={dispacherId}
                  flag={flag}
                />
                {/* <input type="text" value={UnacceptedCarValue} id={trip['Triplog']['id']} rel-affiliate-dispacher={trip['Triplog']['affiliate_accept']} rel-parent-dispacher={trip['Triplog']['parent_dispacher_id']} rel-current-dispacher={dispacherId} rel-call_type={trip['Triplog']['call_type']} className="textfield carAutoComplete" readOnly={flag} /> */}
              </td>
            );
          } else {
            let carName = "Car #";
            if (
              dispacherId != trip["Triplog"]["dispacher_id"] &&
              trip["Triplog"]["call_type"] === "NET"
            ) {
              carName = "NET/" + trip["Triplog"]["car_no"];
            } else if (trip["Triplog"]["car_no"].length != 0) {
              carName = trip["Triplog"]["car_no"];
            } else if (trip["Triplog"]["pending_car_no"].length != 0) {
              carName = "P" + trip["Triplog"]["pending_car_no"];
            } else {
              carName = trip["Triplog"]["car_no"];
            }
            return (
              <td
                key={`car_no${trip["Triplog"]["id"]}`}
                className={`cntr_algn ${back_class} `}
                rel-tripid={trip["Triplog"]["id"]}
                rel-affiliate-dispacher={trip["Triplog"]["affiliate_accept"]}
                rel-parent-dispacher={trip["Triplog"]["parent_dispacher_id"]}
                rel-current-dispacher={dispacherId}
                hold={`NO`}
              >
                <CarValue carName={carName} rel_affiliate_dispache={trip["Triplog"]["affiliate_accept"]} rel_parent_dispacher={trip["Triplog"]["parent_dispacher_id"]} rel_current_dispacher={dispacherId} />
              </td>
            );
          }
        } else {
          let opt;
          if (
            trip["Triplog"]["send_order"] === "all" &&
            trip["Triplog"]["call_type"] != "NET" &&
            trip["Triplog"]["multi_suggest"] != "mult."
          ) {
            opt = "Send To All";
          } else if (trip["Triplog"]["call_type"] === "NET") {
            opt = "'Send To NET'";
          } else if (trip["Triplog"]["pending_car_no"].length != 0) {
            opt = `'P' ${trip["Triplog"]["pending_car_no"]}`;
          } else if (trip["Triplog"]["multi_suggest"].length != 0) {
            opt = "mult.";
          }
          return (
          <td
           className={`${back_class} `}
          >
          <CarAutoComplete
              key={`car_no${trip["Triplog"]["id"]}`}
              trip={trip}
              dispacherId={dispacherId}
              back_class={back_class}
              carName={opt}
              sendInfoToAffiliatetriplog={props.sendInfoToAffiliatetriplog}
            />
            </td>
            );
        }
        break;
      case "pickup_address":
        return (
          <td
            key={`pickup_address${trip["Triplog"]["id"]}`}
            className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["uu_trip_id"].length !== 0
              ? trip["Triplog"]["actual_pickup_address"]
              : trip["Triplog"]["pickup_address"]}
            {trip["Triplog"]["pickup_lat"].length !== 0 &&
            trip["Triplog"]["pickup_lng"].length !== 0 ? (
              <img src="/images/correct.png" className="right-top-corner" />
            ) : (
              ""
            )}
          </td>
        );
        break;
      case "dropoff_address":
        return (
          <td
            key={`dropoff_address${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["uu_trip_id"].length !== 0
              ? trip["Triplog"]["actual_dropoff_address"]
              : trip["Triplog"]["dropoff_address"]}
            {trip["Triplog"]["dropoff_lat"].length !== 0 &&
            trip["Triplog"]["dropoff_lng"].length !== 0 ? (
              <img src="/images/correct.png" className="right-top-corner" />
            ) : (
              ""
            )}
          </td>
        );
        break;
      case "created":
        return (
          <td
            key={`created${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {moment(trip["Triplog"]["created"]).format("LT")}
          </td>
        );
        break;
      case "pickup_time":
        if (trip["Triplog"]["uu_trip_id"].length !== 0) {
          return (
            <td
              key={`pickup_time${trip["Triplog"]["id"]}`}
               className={`${back_class} `}
              onClick={() =>
                openTripDetails(
                  trip["Triplog"]["id"],
                  trip["Triplog"]["dispacher_id"],
                  this
                )
              }
            >
              {trip["Triplog"]["pickup_timing"].length !== 0
                ? moment(
                    trip["Triplog"]["pickup_date"] +
                      " " +
                      trip["Triplog"]["pickup_timing"]
                  ).format("LT")
                : ""}
            </td>
          );
        } else {
          return (
            <td
              key={`pickup_time${trip["Triplog"]["id"]}`}
               className={`${back_class} `}
              onClick={() =>
                openTripDetails(
                  trip["Triplog"]["id"],
                  trip["Triplog"]["dispacher_id"],
                  this
                )
              }
            >
              {trip["Triplog"]["pickup_time"].length !== 0
                ? moment(
                    trip["Triplog"]["pickup_date"] +
                      " " +
                      trip["Triplog"]["pickup_time"]
                  ).format("LT")
                : ""}
            </td>
          );
        }
        break;
      case "pickup_date":
        return (
          <td
            key={`pickup_date${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["pickup_date"]}
          </td>
        );
        break;
      case "eta":
        return (
          <td
            key={`eta${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            N/A
          </td>
        );
        break;
      case "details":
        return (
          <td
            key={`details${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["details"].length !== 0 &&
            trip["Triplog"]["details"].length > 50
              ? trip["Triplog"]["details"].substr(0, 50) + ".."
              : trip["Triplog"]["details"]}
          </td>
        );
        break;
      case "car_type":
        return (
          <td
          key={`car_type${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          ></td>
        );
        break;
      case "total_paid_amount":
        return (
          <td
          key={`total_paid_amount${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["total_paid_amount"]}
          </td>
        );
        break;
      case "telephone":
        return (
          <td
          key={`telephone${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["telephone"]}
          </td>
        );
        break;
      case "passenger_name":
        return (
          <td
          key={`passenger_name${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["passenger_name"]}
          </td>
        );
        break;
      case "cps":
        return <td key={`cps${trip["Triplog"]["id"]}`}  className={`${back_class} `}></td>;
        break;
      case "pickup_cross_street":
        return (
          <td
            key={`pickup_cross${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["pickup_cross_street"]}
          </td>
        );
        break;
      case "dropoff_cross_street":
        return (
          <td
          key={`dropoff_cross${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["dropoff_cross_street"]}
          </td>
        );
        break;
      case "dispacher_note":
        return (
          <td
            key={`dispatcher_note${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["dispacher_note"]}
          </td>
        );
        break;
      case "payment_method":
        return (
          <td
            key={`payment_method${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["payment_method"].length !== 0
              ? trip["Triplog"]["payment_method"]
              : "Cash"}
          </td>
        );
        break;
      case "account_no":
        return (
          <td
            key={`account_no${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["account_no"]}
          </td>
        );
        break;
      case "job_no":
        return (
          <td
            key={`job_no${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["job_no"]}
          </td>
        );
        break;
      case "network_parent_company":
        return (
          <td
            key={`network_parent_company${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["parent_dispacher_id"]}
          </td>
        );
        break;
      case "network_child_company":
        return (
          <td
          key={`network_child_company${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["dispacher_id"]}
          </td>
        );
        break;
      case "sub_userid":
        return (
          <td
          key={`sub_userid${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["sub_userid"]}
          </td>
        );
        break;
      case "arrive_time":
        return (
          <td
          key={`arrive_time${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["arrive_time"].length !== 0
              ? moment(trip["Triplog"]["pickup_time"]).format("LT")
              : ""}
          </td>
        );
        break;
      case "pickup_timing":
        return (
          <td
          key={`pickup_timing${trip["Triplog"]["id"]}`}
             className={`${back_class} `}
            onClick={() =>
              openTripDetails(
                trip["Triplog"]["id"],
                trip["Triplog"]["dispacher_id"],
                this
              )
            }
          >
            {trip["Triplog"]["pickup_timing"].length !== 0
              ? moment(trip["Triplog"]["pickup_timing"]).format("LT")
              : ""}
          </td>
        );
        break;
    }
  };
  const getTriplogStatus = (triplog_status) => {
    if (triplog_status != "") {
      if (triplog_status == 0) {
        // Waiting
        return "blink";
      }
      if (triplog_status == 1) {
        // Accepted
        return "orange_col";
      }
      if (triplog_status == 5) {
        //Arrived
        return "orange2_col";
      }
      if (triplog_status == 2) {
        //Declined
        return "blue_col";
      }
      if (triplog_status == 3) {
        // Completed
        return "green_col";
      }
      if (triplog_status == 4) {
        //Picked up
        return "red_col";
      }
    } else {
      return "";
    }
  };
  const onError = () => {};
  const CancelTrip = async (i, tripid) => {
    const confir = window.confirm(
      "Are you sure you want to cancel this booking ?"
    );
    if (confir) {
      try {
        setSubmitting(true);
        const res = await TriplogServices.cancelTrip({ id: tripid });
        setSubmitting(false);
        if (res && res.status === 200) {
          if (res.data && res.data.status === 1) {
            delete tripAllList[tripid];
            setTripAllList({ ...tripAllList });
            store.dispatch(loadTripListDataRemove(tripAllList));
            toast.success(res.data.message);
            return;
          }
          onError(res.data.message);
        }
      } catch (err) {
        setSubmitting(false);
        onError();
      }
    } else {
      return;
    }
  };
  const processTripList = () => {
    return Object.values(tripAllList).map(function(trip, index, arr) {
      //let eta = 0;
      let bgclass='';
      let back_class='';
      let blink_class = "";
      if (trip["DispatcherTrip"]["trip_status"] == 3) {
        bgclass = "blue_col";
      } else {
        bgclass = getTriplogStatus(trip["Triplog"]["status"]);
      }
      if (
        trip["Triplog"]["uu_trip_id"] != "" ||
        trip["Triplog"]["process_type"] == "booking" ||
        trip["Triplog"]["process_type"] == "kiosk"
      ) {
        back_class = "gray";
      }
      if (
        trip["DispatcherTrip"]["is_reservation"] == 1 &&
        trip["Triplog"]["account_no"].length !== 0
      ) {
        back_class = "pink";
      }
      if (
        trip["DispatcherTrip"]["is_reservation"] == 1 &&
        trip["Triplog"]["account_no"].length == 0
      ) {
        back_class = "blue";
      }
      if (
        trip["DispatcherTrip"]["is_reservation"] != 1 &&
        trip["Triplog"]["account_no"].length !== 0
      ) {
        back_class = "purple";
      }
      bgclass='bg_'+bgclass;
      return (
        <tr
         key={`trip${trip["Triplog"]["id"]}`}
          id={`tripRow${trip["Triplog"]["id"]}`}
          className={`status_${trip["DispatcherTrip"]["trip_status"]}${trip["Triplog"]["status"]} ${back_class}`}
        >
          {Object.keys(TriplogSetting).map((key, idx) => {
            return getTriplogColumn(
              key,
              trip,
              DispatcherId,
              blink_class,
              bgclass,
              idx
            );
          })}
          <td
    // className={`${back_class} `}
          >
            <img
              src="/images/b_drop.png"
              onClick={() => CancelTrip(index, trip.DispatcherTrip.trip_id)}
              className="rmbtn"
              alt="Cancel"
            />
          </td>
          <td></td>
          <td></td>
        </tr>
      );
    });
  };

  return (
    <React.Fragment>
      <table
        cellPadding="0"
        cellSpacing="0"
        border=".5"
        id="tripLogTable"
        width="100%"
        className="text-center text-black "
      >
        <thead className="text-primary">
          <tr>
            {TriplogSetting &&
              TriplogSettingFields &&
              Object.keys(TriplogSetting).map((el, i, arr) => {
                return (
                  TriplogSettingFields[el] && (
                    <th key={i.toString()} align="center">
                      {TriplogSettingFields[el]}
                    </th>
                  )
                );
              })}

            <th align="center">Cancel</th>
            <th align="center">AC</th>
            <th align="center">Log</th>
          </tr>
        </thead>
        <tbody>{processTripList()}</tbody>
      </table>
      {submiting && <FullPageLoader />}
    </React.Fragment>
  );
};

export default TripList;
