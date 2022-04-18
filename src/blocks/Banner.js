import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Banner = ({ userLoggedIn }) => {
  return (
    <section className="banner_sec">
                    <div className="overlay"></div>
                    <div className="container">

                        <div className="bnr_bg">
                            <div className="banner_text row">

                                <div className="col-md-6">
                                    <h1 className="white_text head_h1">No Commitment <strong> Pay As You <br /> Go Car Buying </strong>
                                    </h1>
                                    <p className="mt-2 mb-5 pr-5 text-white"></p>
                                    <Link  to={userLoggedIn ? "/account/prequalify" : "/login"} >
                                        <button type="button" className="btn_bnner bg_color btn  mb-1 mr-2">Get Pre Qualified</button>
                                    </Link>
                                    <Link to="/cars">
                                        <button type="button" className=" btn_bnner btn mb-1"> <i className="fa fa-search mr-2" aria-hidden="true"></i>SEARCH</button>
                                    </Link>
                                    
                                    
                                </div>
                                <div className="col-md-6">
                                    <div className="banner_img">
                                        <img src="/images/car-banner.png" className="img-responsive" alt="img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shape">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                            <path className="elementor-shape-fill" d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3
                                c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3
                                c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"></path>
                        </svg>
                    </div>
                </section>
  );
};

const mapStateToPops = (state) => {
  const { userLoggedIn } = state.auth;
  return { userLoggedIn };
};

export default connect(mapStateToPops)(Banner);
