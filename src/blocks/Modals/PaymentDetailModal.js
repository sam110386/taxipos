import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import {
  getActiveBookingDetail,
  getPastBookingDetail,
} from "../../services/userServices";
import { FixedLoader } from "../Loaders";
import { getFormattedDate } from "../../utils/helperFunctions";

export default function PaymentDetailModal({ item, handleClose }) {
  const [loading, setLoading] = useState(true);
  const [bookingDetail, setBookingDetail] = useState(null);

  const loadBookingDetail = async (id, status) => {
    let res = null;
    if (status === 1 || status === "1")
      res = await getActiveBookingDetail({ bookingid: id });
    else res = await getPastBookingDetail({ bookingid: id });

    setLoading(false);
    if (res && res.status === 200) {
      if (res.data && res.data.status) {
        setBookingDetail(res.data.result);
        return;
      }
    }
    handleClose();
  };
  useEffect(() => {
    if (item) {
      try {
        const status = parseInt(item.Booking.status);
        const id = parseInt(item.Booking.id);
        if (!id || !status) handleClose();
        else {
          loadBookingDetail(id, status);
        }
      } catch (Err) {
        handleClose();
      }
    } else {
      handleClose();
    }
  }, [item]);

  if (!item) return null;
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      fullScreen
    >
      <MuiDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {item.Booking.make} {item.Booking.model} {item.Booking.year}
      </MuiDialogTitle>
      <MuiDialogContent dividers>
        <React.Fragment>
          {loading && <FixedLoader />}

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
                          className="rounded-lg border"
                          alt=""
                          style={{ minWidth: 434, minHeight: 240 }}
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
                                    {bookingDetail && bookingDetail.end_mileage}{" "}
                                    M
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
                  <div className="program buld_prog mt-2">
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
                                  Allowed Mile per day
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
                </div>
                <div className="col-sm-4">
                  <div className="vichel_etail payment_status">
                    <h2>Payments</h2>
                    <div className="item_ship">
                      <div className="d-flex align-items-center justify-content-between">
                        <span>Renew Date</span>
                        <span className="vich_span">
                          {bookingDetail &&
                            getFormattedDate(
                              bookingDetail.suggested_autorenew_datetime
                            )}
                        </span>
                      </div>
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
                        <span>DIA Fee</span>
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
                      <div className="d-flex align-items-center justify-content-between insur_paid">
                        <span>Insurance</span>
                        <span className="vich_span">
                          $
                          {bookingDetail &&
                            (bookingDetail.total_insurance || "0.0")}
                        </span>
                      </div>
                      <div className="mt-4 d-flex align-items-center justify-content-between insur_paid">
                        <span>Extra Insurance Usage Fee</span>
                        <span className="vich_span">
                          {bookingDetail && (bookingDetail.dia_insu || "0.0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12"></div>
              </div>
            </div>
          </section>
        </React.Fragment>
      </MuiDialogContent>
      <MuiDialogActions>
        <button onClick={handleClose} className="btn">
          close
        </button>
      </MuiDialogActions>
    </Dialog>
  );
}
