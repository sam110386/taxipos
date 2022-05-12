import * as Yup from "yup";

export const TriplogSchema = Yup.object().shape({
    pickup_address: Yup.string().required("Please enter Pickup-Address"),
    dropoff_address: Yup.string().required("Please enter Drop-Off-Address"),
    account_no: Yup.number().min(4),
    telephone: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Telephone number is not valid'),
    fare: Yup.number("Please Enter Currect Fare")

});

export const optSchema = Yup.object().shape({
    otp: Yup.string()
      .min(5)
      .max(5)
      .required("Please enter activation code"),
  });

export const initial_Values = {
    pickup_lat: "",
    pickup_lng: "",
    pickup_address: "",
    device_id: "",
    pickup_date: "",
    pickup_time: "",
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

export const TripDetails_initial_Values = {
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