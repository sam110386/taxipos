import React, { useEffect, useState } from "react";
const HomeBlock = () => {
    return (
        <div>
              
                <section className="buycar_sec">
                    <div className="container">
                        <div className="row alignitems-center">
                            
                            <div className="col-md-6">
                                <div className="buy_car">
                                    <h4 className="subheading">
                                        Watch Demo
                                    </h4>
                                    <h2 className="heading_demo">
                                        Let’s Watch <strong className="d-block"> Overview</strong>
                                    </h2>
                                    <ul className="watch_list list-unstyled mt-3">
                                        <li> <strong> Like </strong>the car. </li>
                                        <li> <strong> Pay </strong>for use. </li>
                                        <li> <strong> Love</strong> the car. </li>
                                        <li> <strong> Use </strong>your payments. </li>
                                        <li> <strong> Buy </strong>the car.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="work_sec">
                    <div className="shape shape-new">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                            <path className="elementor-shape-fill" d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3
                        c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3
                        c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"></path>
                        </svg>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="work_head">
                                    <h4 className="subheading">
                                        Our Features
                                    </h4>
                                    <h2 className="heading_demo">
                                        DriveItAway <strong> Highlights</strong>
                                    </h2>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row bg_carsby">
                            <div className="col-md-6">
                                <img src="/images/car_bg.jpg" className="img-car" />
                            </div>
                            <div className="col-md-6 car_buying">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="work_box row">
                                            <div className="col-sm-2 col-md-3">
                                                <div className="work_icon d-flex align-items-center justify-content-center">
                                                    <img src="/images/highway1.png" alt="" /></div>
                                            </div>
                                            <div className="col-sm-10 col-md-9">
                                                <div className="work_text">
                                                    <h5 className="blue_text head_h5">Subscribe To Own</h5>
                                                    <p>Choose the car you want to buy, but start in a rental contract--no obligation to keep it. Pay for your usage. Earn $ rewards towards a down payment coupon for purchase or return it at any time.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="work_box row">
                                            <div className="col-sm-2 col-md-3">
                                                <div className="work_icon d-flex align-items-center justify-content-center">
                                                    <img src="/images/highway2.png" alt="" /></div>
                                            </div>
                                            <div className="col-sm-10 col-md-9">
                                                <div className="work_text">
                                                    <h5 className="blue_text head_h5">Build Down Payment While Driving</h5>
                                                    <p>Each subscription payment will earn cash back rewards up to 85% that can be used towards a down payment in an auto loan if you decide to keep the car.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="work_box row">
                                            <div className="col-sm-2 col-md-3">
                                                <div className="work_icon d-flex align-items-center justify-content-center">
                                                    <img src="/images/highway3.png" alt="" /></div>
                                            </div>
                                            <div className="col-sm-10 col-md-9">
                                                <div className="work_text">
                                                    <h5 className="blue_text head_h5">Receive Loan Offers Along The Way</h5>
                                                    <p>While driving, you will get offers from lenders to convert to an auto loan using what you've built in down payment.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="work_box row">
                                            <div className="col-sm-2 col-md-3">

                                                <div className="work_icon d-flex align-items-center justify-content-center">
                                                    <img src="/images/highway4.png" alt="" /></div>
                                            </div>
                                            <div className="col-sm-10 col-md-9">
                                                <div className="work_text">
                                                    <h5 className="blue_text head_h5">Qualify Based on Income NOT Credit</h5>
                                                    <p>DriveItAway has a credit-agnostic approach that will allow you to drive based on your income and budget. Credit does not matter at this point.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="work_box row">
                                            <div className="col-sm-2 col-md-3">
                                                <div className="work_icon d-flex align-items-center justify-content-center">
                                                    <img src="/images/highway5.png" alt="" /></div>
                                            </div>
                                            <div className="col-sm-10 col-md-9">
                                                <div className="work_text">
                                                    <h5 className="blue_text head_h5">Full Warranty and Maintenance</h5>
                                                    <p>High quality vehicles are listed in DriveItAway. All vehicles are fully covered while in the program. Maintenance is included.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="howork_sec">
                    <div className="container">
                        <div className="work_head text-center">
                            <h4 className="subheading">
                                Steps Flow
                            </h4>
                            <h2 className="heading_demo">
                                How It <strong> Works</strong>
                            </h2>
                            <p className="head_para_short"> Follow Steps below to rent</p>

                        </div>
                        <div className="howsworks_cls row align-items-center">
                            <div className="col-lg-12 col-md-12">
                                <div className="buy_car d-flex justify-content-between">
                                    <div className="media box11 work_box d-block text-center align-self-md-end">
                                        <div className="media-left  d-flex align-items-center justify-content-center">1</div>
                                        <div className="media-body">
                                            <h5 className="blue_text head_h5">Find Your Dream Car</h5>
                                            <p>Browse dealer inventory near you and find your dream car. The qualification process
                                                is solely based on your income--no credit check required.</p>
                                        </div>
                                    </div>
                                    <div className="media box11 box12 work_box d-block text-center align-self-md-start">

                                        <div className="media-body">
                                            <h5 className="blue_text head_h5">Build Your Program</h5>
                                            <p>Choose your initial and monthly fee. Paying more unfront will lower your monthly and
                                                vice versa. The program will build you a 20% down payment within 6 months as you
                                                drive.</p>
                                        </div>
                                        <div className="media-left  d-flex align-items-center justify-content-center">2</div>
                                    </div>
                                    <div className="media box11 box13 work_box d-block text-center align-self-md-start pt-5">
                                        <div className="media-left  d-flex align-items-center justify-content-center">3</div>
                                        <div className="media-body">
                                            <h5 className="blue_text head_h5">Pay For Use As You Drive</h5>
                                            <p>Usage and insurance is prepaid and based on the miles you drive.</p>
                                        </div>
                                    </div>
                                    <div className="media box11  box14 work_box d-block text-center align-self-md-start">

                                        <div className="media-body">
                                            <h5 className="blue_text head_h5">Usage Fees Build Your Down Payment</h5>
                                            <p>All usage fees can contribute to a down payment if and when you choose to buy the
                                                car.</p>
                                        </div>
                                        <div className="media-left  d-flex align-items-center justify-content-center">4</div>
                                    </div>
                                    <div className="media box11 box15 work_box d-block text-center align-self-md-end">
                                        <div className="media-left  d-flex align-items-center justify-content-center">5</div>
                                        <div className="media-body">
                                            <h5 className="blue_text head_h5">Buy Your Car</h5>
                                            <p>Receive loan offers from lenders as you drive using what you’ve built in down payment
                                                while driving. Convert to ownership when it’s right for you!</p>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="review_sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 pl-4">
                                <div className="work_head">
                                    <h4 className="subheading ">
                                        Testimonials
                                    </h4>
                                    <h2 className="heading_demo">
                                        What people <strong> say about Us.</strong>
                                    </h2>
                                    <img src="/images/strip.jpg" />
                                </div>
                            </div>
                            <div className="col-md-6 pl-5">
                                <div className="row">
                                    
                                    <div className="col-sm-2">

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
        </div>
    );	
}
export default HomeBlock;
