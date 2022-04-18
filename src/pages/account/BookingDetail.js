import React, { useEffect, useState, useMemo, useRef } from "react";
import { withRouter } from "react-router-dom";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { FixedLoader } from "../../blocks/Loaders";
import {
  extendActiveBooking,
  getActiveBookingDetail,
  getPastBookingDetail,
  getPendingBookingDetail,
  getVehicleInspectionDoc,
  getVehicleInsuranceDoc,
  getVehicleRegistrationDoc,
  getVehicleRentalAgreementDoc,
} from "../../services/userServices";
import { getFormattedDate } from "../../utils/helperFunctions";
import { ErrorDialog } from "../../blocks/Dialogs";
import HomeAppBottom from "../../blocks/HomeAppBottom";
import { ImageModal } from "../../blocks/Modals";

const BookingDetail = (props) => {
  const link_container_ref = useRef();

  const [loading, setLoading] = useState(true);
  const [bookingDetail, setBookingDetail] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [autorenewenddate, setautorenewenddate] = useState(
    moment(new Date()).format("h:mm a - Do MMMM")
  );
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState(null);

  const goBack = () => {
    window.history.back();
  };

  const loadBookingDetail = async (id, type) => {
    let res = null;
    if (type === 1 || type === "1")
      res = await getPendingBookingDetail({ bookingid: id });
    if (type === 2 || type === "2")
      res = await getActiveBookingDetail({ bookingid: id });
    if (type === 3 || type === "3")
      res = await getPastBookingDetail({ bookingid: id });
    setLoading(false);
    if (res && res.status === 200) {
      if (res.data && res.data.status) {
        setBookingDetail(res.data.result);
        return;
      }
    }
    goBack();
  };

  const extendBooking = async () => {
    if (!props) return;
    try {
      setLoading(true);
      const { id } = props.match.params;
      const data = {
        booking_id: id,
        autorenew: 1,
        autorenewenddate: selectedDate.toString(),
      };
      const res = await extendActiveBooking(data);
      setLoading(false);
      if (res && res.status === 200) {
        setMessage(res.data.message);
        setOpenDialog(true);
        return;
      }
      setMessage("Sorry! something went wrong.Please reload your page.");
      setOpenDialog(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessage("Sorry! something went wrong.Please reload your page.");
      setOpenDialog(true);
    }
  };

  const closeModal = () => {
    const { id, type } = props.match.params;
    loadBookingDetail(id, type);
    setMessage("");
    setOpenDialog(false);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setOpenDialog(true);
  };

  const getVehicleInsurence = async (data) => {
    try {
      setLoading(true);
      const res = await getVehicleInsuranceDoc(data);
      setLoading(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          openLink(res.data.result.file);
          return;
        }
        showMessage(res.data.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const getVehicleRental = async (data) => {
    try {
      setLoading(true);
      const res = await getVehicleRentalAgreementDoc(data);
      setLoading(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          openLink(res.data.result.file);
          return;
        }
        showMessage(res.data.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const getVehicleRegistration = async (data) => {
    try {
      setLoading(true);
      const res = await getVehicleRegistrationDoc(data);
      setLoading(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          setImageData(res.data.result);
          return;
        }
        showMessage(res.data.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const getVehicleInspection = async (data) => {
    try {
      setLoading(true);
      const res = await getVehicleInspectionDoc(data);
      setLoading(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          setImageData(res.data.result);
          return;
        }
        showMessage(res.data.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const openLink = (url_link) => {
    if (!url_link) {
      setMessage("Not Available");
      setOpenDialog(true);
      return;
    }
    if (link_container_ref.current) {
      const link = document.createElement("a");
      link.href = url_link;
      link.target = "_blank";
      link_container_ref.current.appendChild(link);
      link.click();
      link_container_ref.current.removeChild(link);
    }
  };

  useEffect(() => {
    if (props) {
      const { id, type } = props.match.params;
      if (!id || !type) goBack();
      else {
        loadBookingDetail(id, type);
      }
    } else {
      goBack();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [props]);

  useMemo(() => {
    if (bookingDetail) {
      handleDateChange(moment(bookingDetail.suggested_autorenew_datetime));
      setautorenewenddate(
        moment(bookingDetail.suggested_autorenew_datetime).format(
          "h:mm a - Do MMMM"
        )
      );
    }
  }, [bookingDetail]);

  useMemo(() => {
    setautorenewenddate(moment(selectedDate._d).format("h:mm a - Do MMMM"));
  }, [selectedDate]);

  // if (loading) return ;

  return (
    <React.Fragment>
      {loading && <FixedLoader />}
      <section className="pick_date book_det">
        <div className="container">
          <div className="merc_div">
            <h2>
              {bookingDetail && bookingDetail.make} -{" "}
              {bookingDetail && bookingDetail.model}
            </h2>
            {/* <p>ABC Dealer7848 Pendleton Pike Indianapolis IN 46226</p> */}
          </div>
        </div>
      </section>
      <section className="pending_status mb-4">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div className="book_hed">
                <h2>Booking Details</h2>
              </div>
              <div className="row">
                <div className="col-sm-7">
                  <div className="bookde_div">
                    <img
                      src={bookingDetail && bookingDetail.filename}
                      className="rounded-lg"
                      alt=""
                    />
                    <div className="buy_car product_dtl mt-2">
                      <div className="row">
                        <div className="col-3">
                          <div className="media">
                            <div className="media-left d-flex align-items-center justify-content-center">
                              <img src={"/images/product_dtl.png"} alt="" />
                            </div>
                            <div className="media-body">
                              <h5 className="head_h5">Mileage</h5>
                              <h5 className="blue_text head_h5 m-0">
                                {bookingDetail && bookingDetail.end_mileage} M
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="media">
                            <div className="media-left d-flex align-items-center justify-content-center">
                              <img src="/images/product_dtl2.png" alt="" />
                            </div>
                            <div className="media-body">
                              <h5 className="head_h5">Door</h5>
                              <h5 className="blue_text head_h5 m-0">
                                {bookingDetail && bookingDetail.doors}
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="media">
                            <div className="media-left d-flex align-items-center justify-content-center">
                              <img src="/images/product_dtl3.png" alt="" />
                            </div>
                            <div className="media-body">
                              <h5 className="head_h5">Gearbox</h5>
                              <h5 className="blue_text head_h5 m-0">
                                {bookingDetail &&
                                bookingDetail.transmition_type === "A"
                                  ? "Automatic"
                                  : "Manual"}
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="media">
                            <div className="media-left d-flex align-items-center justify-content-center">
                              <img src="/images/product_dtl4.png" alt="" />
                            </div>
                            <div className="media-body">
                              <h5 className="head_h5">Engine Type</h5>
                              <h5 className="blue_text head_h5 m-0">
                                {bookingDetail && bookingDetail.engine}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="activ_status d-flex align-items-center justify-content-between">
                    <span style={{ fontSize: 12 }}>
                      {bookingDetail &&
                        getFormattedDate(bookingDetail.start_datetime)}
                    </span>
                    <span className="cricle">to</span>
                    <span style={{ fontSize: 12 }}>
                      {bookingDetail &&
                        getFormattedDate(bookingDetail.end_datetime)}
                    </span>
                  </div>
                  <div className="_stat_div">
                    <p>
                      Status{" "}
                      <span>
                        {bookingDetail &&
                          bookingDetail.status === "1" &&
                          "Active"}
                        {bookingDetail &&
                          bookingDetail.status === "0" &&
                          "Pending"}
                        {bookingDetail &&
                          bookingDetail.status === "2" &&
                          "Canceled"}
                        {bookingDetail &&
                          bookingDetail.status === "3" &&
                          "Completed"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="program buld_prog">
                <div className="product_dtl">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="engine_type">
                        <div className="d-flex align-items-center">
                          <div className="engine_left">
                            <h5 className="blue_text head_h5 mb-0">
                              Beginning Mileage Count
                            </h5>
                          </div>
                          <div className="engine_line" />
                        </div>
                        <h5 className="head_h5 mb-0">
                          {bookingDetail && bookingDetail.start_mileage}
                        </h5>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="engine_type">
                        <div className="d-flex align-items-center">
                          <div className="engine_left">
                            <h5 className="blue_text head_h5 mb-0">
                              Ending Mileage Count
                            </h5>
                          </div>
                          <div className="engine_line" />
                        </div>
                        <h5 className="head_h5 mb-0">
                          {bookingDetail && bookingDetail.end_mileage}
                        </h5>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="engine_type">
                        <div className="d-flex align-items-center">
                          <div className="engine_left">
                            <h5 className="blue_text head_h5 mb-0">
                              Latest Checked
                            </h5>
                          </div>
                          <div className="engine_line" />
                        </div>
                        <h5 className="head_h5 mb-0">
                          {bookingDetail &&
                            getFormattedDate(bookingDetail.mileage_checked)}
                        </h5>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="engine_type">
                        <div className="d-flex align-items-center">
                          <div className="engine_left">
                            <h5 className="blue_text head_h5 mb-0">
                              Total Mileages
                            </h5>
                          </div>
                          <div className="engine_line" />
                        </div>
                        <h5 className="head_h5 mb-0">
                          {bookingDetail && bookingDetail.total_mileage}
                        </h5>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="engine_type">
                        <div className="d-flex align-items-center">
                          <div className="engine_left">
                            <h5 className="blue_text head_h5 mb-0">
                              Extra Usage Rate
                            </h5>
                          </div>
                          <div className="engine_line" />
                        </div>
                        <h5 className="head_h5 mb-0">
                          {bookingDetail && bookingDetail.emf_uses}
                        </h5>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="engine_type">
                        <div className="d-flex align-items-center">
                          <div className="engine_left">
                            <h5 className="blue_text head_h5 mb-0">
                              Current Extra Usage fee
                            </h5>
                          </div>
                          <div className="engine_line" />
                        </div>
                        <h5 className="head_h5 mb-0">
                          ${bookingDetail && bookingDetail.extra_mileage_fee}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prop_div vic_doc">
                <div className="book_hed fedd_h2">
                  <h2 className="text-left">Vehicle Documents</h2>
                </div>
                <div className="row vich_docment">
                  <div className="col-md-6 col-lg-3">
                    <div
                      className="month_box d-flex align-items-center justify-content-center cursor-pointer"
                      onClick={() =>
                        getVehicleInsurence({ booking_id: bookingDetail.id })
                      }
                    >
                      <div>
                        <img src="/images/Group-587.svg" alt="" />
                      </div>
                    </div>
                    <div className="vich_cont">
                      <p className="vichel_p">Insurance</p>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-3">
                    <div
                      className="month_box d-flex align-items-center justify-content-center cursor-pointer"
                      onClick={() =>
                        getVehicleRegistration({
                          vehicle_id: bookingDetail.vehicle_id,
                        })
                      }
                    >
                      <div>
                        <img src="/images/Group-589.svg" alt="" />
                      </div>
                    </div>
                    <div className="vich_cont">
                      <p className="vichel_p">Registration</p>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-3">
                    <div
                      className="month_box d-flex align-items-center justify-content-center cursor-pointer"
                      onClick={() =>
                        getVehicleRental({ booking_id: bookingDetail.id })
                      }
                    >
                      <div>
                        <img src="/images/Group-590.svg" alt="" />
                      </div>
                    </div>
                    <div className="vich_cont">
                      <p className="vichel_p">Rental Agreement</p>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-3">
                    <div
                      className="month_box d-flex align-items-center justify-content-center cursor-pointer"
                      onClick={() =>
                        getVehicleInspection({
                          vehicle_id: bookingDetail.vehicle_id,
                        })
                      }
                    >
                      <div>
                        <img src="/images/check-up.svg" alt="" />
                      </div>
                    </div>
                    <div className="vich_cont">
                      <p className="vichel_p">Inspection Sticker</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              {bookingDetail && bookingDetail.status === "1" && (
                <div className="book_hed expend_to">
                  <h2>Extend to</h2>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      open={openDatePicker}
                      className="d-none"
                      disablePast
                      onAccept={() => setOpenDatePicker(!openDatePicker)}
                      onClose={() => setOpenDatePicker(!openDatePicker)}
                      format="hh:mm a mm yyyy"
                    />
                  </MuiPickersUtilsProvider>
                  <div
                    className="form-control d-flex align-items-center pick_calendar"
                    onClick={() => setOpenDatePicker(true)}
                  >
                    <span>
                      <img src="/images/ic-actions-calendar.svg" alt="" />
                    </span>
                    <span className="pick_time">{autorenewenddate}</span>
                  </div>
                  <p className="epend_p">
                    Your account is set to renew this order extension
                    automatically If vehicle not returned. No action is
                    required.
                  </p>

                  <div className="center_btn cncl_btn my_order">
                    {bookingDetail && bookingDetail.status === "0" ? (
                      <button className="btn" onClick={extendBooking}>
                        Start Booking
                      </button>
                    ) : bookingDetail && bookingDetail.payment_retry === 0 ? (
                      <button className="btn" onClick={extendBooking}>
                        Extend My Order
                      </button>
                    ) : (
                      <button className="btn">Retry Payment</button>
                    )}
                  </div>
                </div>
              )}
              <div className="vichel_etail payment_status">
                <h2>Payments</h2>
                <div className="item_ship">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Usage Fees</span>
                    <span className="vich_span">
                      ${bookingDetail && (bookingDetail.rent || "0.0")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Tax</span>
                    <span className="vich_span">
                      ${bookingDetail && (bookingDetail.tax || "0.0")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Booking Fee</span>
                    <span className="vich_span">
                      ${bookingDetail && (bookingDetail.dia_fee || "0.0")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Total Usage Fees</span>
                    <span className="vich_span">
                      $
                      {bookingDetail &&
                        (bookingDetail.carsharing_fee_total || "0.0")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Paid Amount</span>
                    <span className="vich_span">
                      ${bookingDetail && (bookingDetail.paid_amount || "0.0")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Usage Fees Due</span>
                    <span className="vich_span">
                      ${bookingDetail && (bookingDetail.rent || "0.0")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between insur_paid">
                    <span>Insurance - Paid</span>
                    <span className="vich_span">
                      $
                      {bookingDetail &&
                        (bookingDetail.total_insurance || "0.0")}
                    </span>
                  </div>
                  <div className="mt-4 d-flex align-items-center justify-content-between insur_paid">
                    <span>EMF Insurance - Paid</span>
                    <span className="vich_span">
                      {bookingDetail && (bookingDetail.dia_insu || "0.0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {bookingDetail &&
            (bookingDetail.status === "0" || bookingDetail.status === "1") && (
              <div className="center_btn cncl_btn cond_sum">
                <button type="submit" className="btn">
                  Submit Condition Report
                </button>
              </div>
            )}
        </div>
      </section>

      <HomeAppBottom bgclass="bg-gray" />
      <div ref={link_container_ref} />
      {openDialog && <ErrorDialog onClose={closeModal} message={message} />}
      {imageData && (
        <ImageModal images={imageData} onClose={() => setImageData(null)} />
      )}
    </React.Fragment>
  );
};

export default withRouter(BookingDetail);
