import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
// import moment from "moment";
import { FixedLoader } from "../../blocks/Loaders";
import {
  getPendingBookingDetail,
  getVehicleInspectionDoc,
  getVehicleRegistrationDoc,
} from "../../services/userServices";
import { getFormattedDate } from "../../utils/helperFunctions";
import { ErrorDialog } from "../../blocks/Dialogs";
import HomeAppBottom from "../../blocks/HomeAppBottom";
import { ImageModal } from "../../blocks/Modals";

const PastBookingDetail = (props) => {
  const link_container_ref = useRef();

  const [loading, setLoading] = useState(true);
  const [bookingDetail, setBookingDetail] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [bookingCancelled, setBookingCanceled] = useState(false);
  const [imageData, setImageData] = useState(null);

  const goBack = () => {
    window.history.back();
  };

  const loadBookingDetail = async (id) => {
    let res = await getPendingBookingDetail({ bookingid: id });
    setLoading(false);
    if (res && res.status === 200) {
      if (res.data && res.data.status) {
        setBookingDetail(res.data.result);
        return;
      }
    }
    goBack();
  };

  const cancelBooking = async () => {
    if (!props) return;
    try {
      setLoading(true);
      const { id } = props.match.params;
      const data = {
        booking_id: id,
        sharing_allowed: 1,
      };
      const res = await cancelBooking(data);
      setLoading(false);
      if (res && res.status === 200) {
        setMessage(res.data.message);
        setOpenDialog(true);
        setBookingCanceled(true);
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
    if (bookingCancelled) {
      goBack();
      return;
    }
    const { id } = props.match.params;
    loadBookingDetail(id);
    setMessage("");
    setOpenDialog(false);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setOpenDialog(true);
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

  useEffect(() => {
    if (props) {
      const { id } = props.match.params;
      if (!id) goBack();
      else {
        loadBookingDetail(id);
      }
    } else {
      goBack();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [props]);

  return (
    <React.Fragment>
      {loading && <FixedLoader />}
      <section className="pick_date book_det">
        <div className="container">
          <div className="merc_div">
            <h2>
              {bookingDetail && bookingDetail.year}&nbsp;
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
                    <img src={bookingDetail && bookingDetail.filename} alt="" />
                    <div className="buy_car product_dtl">
                      <div className="row">
                        <div className="col-3">
                          <div className="media">
                            <div className="media-left d-flex align-items-center justify-content-center">
                              <img src="/images/product_dtl.png" alt="" />
                            </div>
                            <div className="media-body">
                              <h5 className="head_h5">Mileage</h5>
                              <h5 className="blue_text head_h5 m-0">
                                {bookingDetail && bookingDetail.mileage} M
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
                          (bookingDetail.status === "New"
                            ? "Pending"
                            : bookingDetail.status)}
                      </span>
                      <label className="note pink_text">
                        {bookingDetail && bookingDetail.note}
                      </label>
                      <div className="center_btn cncl_btn my_order">
                        {bookingDetail && bookingDetail.status === "New" && (
                          <button
                            className="btn-danger btn-sm w-100 py-3 border"
                            onClick={cancelBooking}
                          >
                            Cencel Booking
                          </button>
                        )}
                      </div>
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
                    {/* 
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
                    </div> */}

                    <div className="col-sm-4">
                      <div className="engine_type">
                        <div className="d-flex align-items-center">
                          <div className="engine_left">
                            <h5 className="blue_text head_h5 mb-0">
                              Allowed Miles Per Cycle
                            </h5>
                          </div>
                          <div className="engine_line" />
                        </div>
                        <h5 className="head_h5 mb-0">
                          {bookingDetail && bookingDetail.emf_uses}
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

            {/* informations */}
            <div className="col-sm-4">
              <div className="vichel_etail payment_status">
                <h2>Informations</h2>
                <div className="item_ship">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Trim</span>
                    <span className="vich_span">
                      {bookingDetail && (bookingDetail.trim || "")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Vehicle odometer</span>
                    <span className="vich_span">
                      {bookingDetail &&
                        (bookingDetail.carsharing_fee_total || "0.0")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Exterior Color</span>
                    <span className="vich_span">
                      {bookingDetail && (bookingDetail.color || "")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Interior Color</span>
                    <span className="vich_span">
                      {bookingDetail && (bookingDetail.interior_color || "")}
                    </span>
                  </div>
                </div>
                <h2>Proposed Fees</h2>
                <div className="item_ship">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Program Goal</span>
                    <span className="vich_span">
                      {bookingDetail && (bookingDetail.program_goal || "")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Program Length</span>
                    <span className="vich_span">
                      {bookingDetail && (bookingDetail.program_length || "0.0")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Daily Rental Fee</span>
                    <span className="vich_span">
                      ${bookingDetail && (bookingDetail.fare_des || "")}
                    </span>
                  </div>
                  <div className="">
                    <span className="vich_span">
                      Rental will renew&nbsp;
                      {bookingDetail && (bookingDetail.duration || "")}&nbsp;
                      until programs expires or car is brought back
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>
                      Rental Fee &nbsp;
                      {bookingDetail && (bookingDetail.duration || "")}
                    </span>
                    <span className="vich_span">
                      ${bookingDetail && (bookingDetail.fare || "0.0")}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between insur_paid">
                    <span>Scheduled Fee</span>
                    <span className="vich_span">
                      $
                      {bookingDetail &&
                        (bookingDetail.total_insurance || "0.0")}
                    </span>
                  </div>
                  <div className="mt-4  insur_paid">
                    <span>Scheduled payment Details</span>
                    <span className="vich_span w-100">
                      <ul className="list-unstyled">
                        {bookingDetail &&
                          bookingDetail.initial_fee_options.map((el, i) => (
                            <li key={i + "details"}>
                              {el.amount} on {el.expected}
                            </li>
                          ))}
                      </ul>
                    </span>
                  </div>
                  <div className="mt-4 d-flex align-items-center justify-content-between insur_paid">
                    <span>Allowed miles per cycle</span>
                    <span className="vich_span">
                      {bookingDetail &&
                        (bookingDetail.allowed_miles_per_cycle || "0.0")}
                    </span>
                  </div>
                  <div className="mt-4 d-flex align-items-center justify-content-between insur_paid">
                    <span>Pickup Date</span>
                    <span className="vich_span">
                      {bookingDetail && (bookingDetail.dia_insu || "0.0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default withRouter(PastBookingDetail);
