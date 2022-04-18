import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeAppBottom from "../../../blocks/HomeAppBottom";
import MetaTagsInfo from "../../../blocks/MetaTagsInfo";
import moment from "moment";

const Bookings = (props) => {
  const { id } = props.match.params;
  const offerDetail = useSelector((state) => state.user.offerDetail);

  const renderMeta = () => {
    if (!offerDetail) return;
    var metas = {
      metatitle: offerDetail.vehicle_name,
    };
    return <MetaTagsInfo metas={metas} pageTitle={offerDetail.vehicle_name} />;
  };

  //   const formatPrice = (price) => {
  //     return (
  //       Constants.PREFIX_CURRENCY_SYMBLE +
  //       new Intl.NumberFormat("en-US", { syle: "decimal" }).format(price)
  //     );
  //   };
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", { syle: "number" }).format(num);
  };

  useEffect(() => {
    if (offerDetail && id) {
      if (offerDetail.id !== id) window.location.href = "/account/myoffers";
    } else window.location.href = "/account/myoffers";
  }, [offerDetail]);

  return (
    <div className="product-page">
      {renderMeta()}
      <section className="product_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 carousel">
              <div id="slider" className="flexslider">
                <ul className="slides">
                  <li className="flex-active-slide">
                    <img src={offerDetail && offerDetail.filename} alt="big" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="buy_car product_dtl">
                <h2 className="black_text head_h2 m-0">
                  {offerDetail && offerDetail.make}{" "}
                  {offerDetail && offerDetail.model}{" "}
                  {offerDetail && offerDetail.year}
                </h2>
                {/* <p>{this.state.car.pickup_address}</p> */}
                <p></p>
                <div className="row">
                  <div className="col-6">
                    <div className="media">
                      <div className="media-left d-flex align-items-center justify-content-center">
                        <img src="/images/product_dtl.png" alt="" />
                      </div>
                      <div className="media-body">
                        <h5 className="head_h5">Miles</h5>
                        <h5 className="blue_text head_h5 m-0">
                          {formatNumber(offerDetail && offerDetail.mileage)} Mi
                        </h5>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-6">
                    <div className="media">
                      <div className="media-left d-flex align-items-center justify-content-center">
                        <img src="/images/product_dtl2.png" alt="" />
                      </div>
                      <div className="media-body">
                        <h5 className="head_h5">Doors</h5>
                        <h5 className="blue_text head_h5 m-0">
                          {this.state.car.doors}
                        </h5>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-6">
                    <div className="media">
                      <div className="media-left d-flex align-items-center justify-content-center">
                        <img src="/images/product_dtl3.png" alt="" />
                      </div>
                      <div className="media-body">
                        <h5 className="head_h5">Gearbox</h5>
                        <h5 className="blue_text head_h5 m-0">
                          {offerDetail && offerDetail.transmition_type}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="media">
                      <div className="media-left d-flex align-items-center justify-content-center">
                        <img src="/images/product_dtl4.png" alt="" />
                      </div>
                      <div className="media-body">
                        <h5 className="head_h5">Engine Type</h5>
                        <h5 className="blue_text head_h5 m-0">
                          {offerDetail && offerDetail.engine}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="low_price">
                <h5 className="head_h5 blue_text">Daily</h5>
                <h4 className="pink_text head_h4 m-0">
                  As low as ${offerDetail && offerDetail.fare}/day
                </h4>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 product_dtl">
              <div className="row engine_row">
                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">Exterior Color</h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      {offerDetail && offerDetail.color}
                    </h5>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">Interior Color</h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      {offerDetail && offerDetail.interior_color}
                    </h5>
                  </div>
                </div>

                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">VIN</h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      {offerDetail && offerDetail.vin_no}
                    </h5>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">
                          Allowed Miles per cycle
                        </h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      {offerDetail && offerDetail.emf_uses}
                    </h5>
                  </div>
                </div>
                {/* <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">Stock#</h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      {this.state.car.stock_no}
                    </h5>
                  </div>
                </div> */}
                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">Selling Price</h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      ${offerDetail && offerDetail.vehicle_cost}
                    </h5>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">Program Length</h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      {offerDetail && offerDetail.program_length}
                    </h5>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">Program Goal</h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      {offerDetail && offerDetail.program_goal}
                    </h5>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">Daily Rental Fee</h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      ${offerDetail && offerDetail.fare} / day
                    </h5>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">Rental Duration</h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      Rental will renew {offerDetail && offerDetail.duration}
                      &nbsp; until program expires or car is brought back
                    </h5>
                  </div>
                </div>

                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">Scheduled Fees</h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      ${offerDetail && offerDetail.total_initial_fee}
                    </h5>
                  </div>
                </div>
                <div className="col-sm-4 col-lg-6">
                  <div className="engine_type">
                    <div className="d-flex align-items-center">
                      <div className="engine_left">
                        <h5 className="head_h5 mb-0">
                          Scheduled payment Details
                        </h5>
                      </div>
                      <div className="engine_line" />
                    </div>
                    <h5 className="blue_text head_h5 mb-0">
                      <ul className="list-unstyled">
                        {offerDetail &&
                          offerDetail.initial_fee_options.map((el, i) => (
                            <li key={i + "details"}>
                              ${el.amount} on {el.expected}
                            </li>
                          ))}
                      </ul>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4"></div>
            <div className="col-sm-12 col-lg-4">
              <div
                className="form-control d-flex align-items-center justify-content-between pick_calendar
      cursor-pointer"
              >
                <span>
                  <img src="/images/ic-actions-calendar.svg" alt="" />
                  I’II Pickup at :
                </span>
                <span>
                  {offerDetail &&
                    moment(offerDetail.start_datetime).format(
                      "h:mm a - Do MMMM"
                    )}
                </span>
              </div>
              <div className="rate_sec d-flex justify-content-between mt-2">
                <div className="weekly_rate d-flex justify-content-center mr-2 mr-xs-0">
                  <div>
                    <h4 className="blue_text">Weekly Rate</h4>
                    <h3 className="blue_text m-0">
                      ${offerDetail && offerDetail.weeklyEmf}{" "}
                      <small>Usage Rate</small>
                    </h3>
                  </div>
                </div>
                <div className="weekly_rate d-flex justify-content-center">
                  <div>
                    <h4 className="blue_text">Weekly Rate</h4>
                    <h3 className="blue_text m-0">
                      ${offerDetail && offerDetail.insurance_amt}{" "}
                      <small>Insurance Rate</small>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4">
              <h2 className="head_h2 line_head position-relative small_h2">
                Usage Fees Build Down Payment
              </h2>
              <div
                className="rate_sec d-flex justify-content-between"
                style={{ marginTop: 32 }}
              >
                <div className="weekly_rate d-flex justify-content-center mr-2 mr-xs-0">
                  <div>
                    <h5>Down payment built</h5>
                    <h6 className="pink_text m-0">
                      {offerDetail && offerDetail.program_goal}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4" />
            <div className="col-sm-12 col-lg-4">
              <Link to="/account/myoffers/confirm-booking">
                <button className="btn pricing_btn">Next</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <HomeAppBottom bgclass="bg-white" />
    </div>
  );
};

export default withRouter(Bookings);
