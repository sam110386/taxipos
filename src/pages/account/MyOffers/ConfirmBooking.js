import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import HomeAppBottom from "../../../blocks/HomeAppBottom";
import { getUserSignature } from "../../../services/CarService";
import { SimpleLoader } from "../../../blocks/Loaders";
import {
  startPageLoader,
  stopPageLoader,
  showIncomeModal,
  showCreditCardModal,
  showDrivingLicenseModal,
} from "../../../store/actions/GlobalActions";
import { VehicleQuoteErrorDialog, ErrorDialog } from "../../../blocks/Dialogs";
import {
  PrequalifyIncomeModal,
  CreditCardModal,
  DrivingLicenseModal,
} from "../../../blocks/Modals";
import {
  acceptOffer,
  getMyOfferVehicleAgreement,
} from "../../../services/userServices";
import { getOfferQuote } from "../../../services/userServices";
import { removeOfferDetail } from "../../../store/actions/UserAction";

const ConfirmBooking = ({
  offerDetail,
  userDetails,
  startPageLoading,
  stopPageLoading,
  openIncomeModal,
  openCreditCardModal,
  openDrivingLicenseModal,
  clearOfferData,
}) => {
  const link_container_ref = useRef();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userSignature, setUserSignature] = useState(null);
  const [isError, setError] = useState(false);
  const [isErrorMsg, setErrorMsg] = useState("");
  const [offerQuote, setOfferQuote] = useState(null);
  const [isOfferBooked, setIsOfferBooked] = useState(false);

  const showReserveBtn = useMemo(() => {
    if (userDetails) {
      if (!userDetails.is_driver || userDetails.is_driver === "0") return false;
      if (!userDetails.income_reported || userDetails.income_reported === "0")
        return false;
      if (!userDetails.is_renter || userDetails.is_renter === "0") return false;
      return true;
    } else return false;
  }, [userDetails]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const confirmBooking = async () => {
    try {
      startPageLoading();
      const res = await acceptOffer({ offer_id: offerDetail.id });
      stopPageLoading();
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          setIsOfferBooked(true);
        }
        setErrorMsg(res.data.message);
        setError(true);
      } else {
        setErrorMsg("Sorry! Failed to book. please try later");
        setError(true);
      }
    } catch (err) {
      stopPageLoading();
      setErrorMsg("Sorry! something went wrong");
      setError(true);
    }
  };

  const getSignature = async () => {
    try {
      setLoading(true);
      const res = await getUserSignature();
      setLoading(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          setUserSignature(res.data.result.file);
        }
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg("Sorry! something went wrong");
      setError(true);
    }
  };

  const downloadAgrement = async () => {
    try {
      startPageLoading();
      const res = await getMyOfferVehicleAgreement({
        lease_id: offerDetail.vehicle_id,
      });
      stopPageLoading();
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          if (link_container_ref.current) {
            const link = document.createElement("a");
            link.href = res.data.result.file;
            link.target = "_blank";
            link_container_ref.current.appendChild(link);
            link.click();
            link_container_ref.current.removeChild(link);
          }
        }
      }
    } catch (err) {
      stopPageLoading();
      setErrorMsg("Sorry! something went wrong");
      setError(true);
    }
  };

  const clearErrors = () => {
    setError(false);
    setErrorMsg("");
    if (isOfferBooked) {
      window.location.href = "/account/myoffers";
    }
  };

  const onPrequalifyResult = (message) => {
    setErrorMsg(message);
    setError(true);
  };

  const getMyOfferQuote = async () => {
    try {
      startPageLoader();
      const res = await getOfferQuote({ offer_id: offerDetail.id });
      stopPageLoader();
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          clearOfferData();
          setOfferQuote(res.data.result);
          return;
        }
      }
      window.history.back();
    } catch (err) {
      stopPageLoader();
      window.history.back();
    }
  };
  useEffect(() => {
    if (offerDetail) {
      getMyOfferQuote();
    }
    return () => {
      stopPageLoader();
    };
  }, [offerDetail]);

  if (offerDetail === null) {
    window.history.back();
  }

  return (
    <React.Fragment>
      <section className="due_booking pt-4">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <h2 className="due_heading small_h2 text-center">
                Due at Booking
              </h2>
              <div className="due_box">
                <h4>Initial Fee</h4>
                <h3>${offerQuote ? offerQuote.initial_fee : 0.0}</h3>
                <p>*once per booking</p>
              </div>
              <p className="ref_pol">
                <em>
                  Refund Policy: All fees are fully refundable if you do NOT
                  DriveItAway. This reservation holds the vehicle and agreed
                  upon program for you to pick up at the dealership.
                </em>
              </p>
            </div>

            <div className="col-sm-6">
              <h2 className="due_heading small_h2 text-center">
                Due after you test drive and DriveItAway
              </h2>
              <div className="due_box ">
                <h4>Insurance </h4>
                <h3>${offerQuote ? offerQuote.insurance_amt : 0}</h3>
                <p>Paid Every {offerQuote ? offerQuote.rent_days : 0} Days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row mt-3">
          <div className="col-md-6">
            <section className="text-center">
              <h2 className="small_h2">Pricing Breakdown</h2>
            </section>
            <section className="rentalfe">
              <div className="container">
                <div className="rental_table">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="boder_td">
                          Rental Fee
                          <br />
                          {offerQuote && offerQuote.fare_des}
                        </td>
                        <td className="text-right boder_td">
                          ${offerQuote ? offerQuote.rent : 0.0}
                        </td>
                      </tr>
                      <tr>
                        <td>Booking Fee</td>
                        <td className="text-right">
                          ${offerQuote ? offerQuote.dia_fee : 0.0}
                        </td>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <td className="text-right">
                          ${offerQuote ? offerQuote.tax : 0.0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Rent Fee</td>
                        <td className="text-right">
                          ${offerQuote ? offerQuote.total_rental : 0.0}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Insurance & Transaction Fees
                          <br />
                          {offerQuote ? offerQuote.insurance_amt_des : 0.0}
                        </td>
                        <td className="text-right">
                          ${offerQuote ? offerQuote.insurance_amt : 0.0}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
          <div className="col-md-6">
            <section className="servasgn pb-5">
              <div className="container">
                <div className="sign_box position-relative d-flex align-items-end justify-content-center">
                  <img
                    className="position-absolute cursor-pointer"
                    src="/images/down.png"
                    alt=""
                    onClick={getSignature}
                  />
                  {loading ? (
                    <SimpleLoader />
                  ) : userSignature ? (
                    <img
                      className="position-absolute"
                      src={userSignature}
                      alt=""
                      style={{ left: "45%", top: 35 }}
                    />
                  ) : (
                    <span>Signature here</span>
                  )}
                </div>

                <div className="agreement_div text-center">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input mr-2"
                      id="exampleCheck1"
                      value={acceptedTerms}
                      onChange={() => setAcceptedTerms(!acceptedTerms)}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      I have read the agree to the following{" "}
                    </label>
                    <Link
                      className="blue_text agreement"
                      to="#"
                      title=""
                      onClick={downloadAgrement}
                    >
                      Service Agreement
                    </Link>
                  </div>
                  <div className="row justify-content-center">
                    {(!userDetails.is_renter ||
                      userDetails.is_renter === "0") && (
                      <div className="col-lg-4 col-md-6 col-12 mb-2">
                        <button
                          className="btn-sm btn-warning py-2 px-3 w-100"
                          onClick={openCreditCardModal}
                        >
                          Add credit card detail
                        </button>
                      </div>
                    )}
                    {(!userDetails.income_reported ||
                      userDetails.income_reported === "0") && (
                      <div className="col-lg-4 col-md-6 col-12 mb-2">
                        <button
                          className="btn-sm btn-warning py-2 px-3 w-100"
                          onClick={openIncomeModal}
                        >
                          State Income
                        </button>
                      </div>
                    )}
                    {(!userDetails.is_driver ||
                      userDetails.is_driver === "0") && (
                      <div className="col-lg-4 col-md-6 col-12 mb-2">
                        <button
                          className="btn-sm btn-warning py-2 px-3 w-100"
                          onClick={openDrivingLicenseModal}
                        >
                          Add driver’s license
                        </button>
                      </div>
                    )}
                  </div>
                  {showReserveBtn && (
                    <button
                      className="btn"
                      disabled={!acceptedTerms}
                      onClick={confirmBooking}
                    >
                      Reserve
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <section className="month_sec confirm_reservarion">
            <div className="container text-center">
              <h2 className="blue_text head_h2 small_h2">
                {offerDetail ? offerDetail.rent_opt_title : "After 6 Months"}
              </h2>
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <div className="month_box d-flex align-items-center justify-content-center">
                    <div>
                      <img src="/images/month_icon.svg" alt="" />
                      <p className="white_text">
                        {offerDetail && offerDetail.rent_opt_des
                          ? offerDetail.rent_opt_des[0]
                          : "Continue Renting"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="month_box d-flex align-items-center justify-content-center">
                    <div>
                      <img src="/images/month_icon2.svg" alt="" />
                      <p className="white_text">
                        {offerDetail && offerDetail.rent_opt_des
                          ? offerDetail.rent_opt_des[1]
                          : "Continue Renting"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="month_box d-flex align-items-center justify-content-center">
                    <div>
                      <img src="/images/month_icon3.svg" alt="" />
                      <p className="white_text">
                        {offerDetail && offerDetail.rent_opt_des
                          ? offerDetail.rent_opt_des[2]
                          : "Continue Renting"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* <div className="col-sm-6">
          <section className=" highlight_box">
            <h2 className="blue_text head_h2 small_h2 text-center">
              Highlights
            </h2>
            <div className="container">
              <div className="longul">
                <ul>
                  {offerDetail &&
                    offerDetail.return_policy_text &&
                    offerDetail.return_policy_text.map((el, i) => (
                      <li key={"item-" + i++}>
                        <i
                          className="fa fa-check fa-2x pink_text"
                          aria-hidden="true"
                        />
                        {el}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </section>
        </div> */}
      </div>
      <div ref={link_container_ref} />
      <HomeAppBottom bgclass="bg-gray" />
      <VehicleQuoteErrorDialog />
      {isError && <ErrorDialog message={isErrorMsg} onClose={clearErrors} />}
      <PrequalifyIncomeModal onResult={onPrequalifyResult} />
      <CreditCardModal onResult={onPrequalifyResult} />
      <DrivingLicenseModal onResult={onPrequalifyResult} />
    </React.Fragment>
  );
};

const mapStateToPops = (state) => {
  const { offerDetail } = state.user;
  const { userDetails } = state.auth;
  return { offerDetail, userDetails };
};

const mapDispatchToPops = (dispatch) => {
  return {
    startPageLoading: () => dispatch(startPageLoader()),
    stopPageLoading: () => dispatch(stopPageLoader()),
    openIncomeModal: () => dispatch(showIncomeModal()),
    openCreditCardModal: () => dispatch(showCreditCardModal()),
    openDrivingLicenseModal: () => dispatch(showDrivingLicenseModal()),
    clearOfferData: () => dispatch(removeOfferDetail()),
  };
};

export default connect(mapStateToPops, mapDispatchToPops)(ConfirmBooking);
