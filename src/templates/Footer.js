import React, { Component } from "react";
import { Link } from "react-router-dom";
// var Constants = require("../config/Constants");

class Footer extends Component {
  state = { config: {} };

  componentDidMount() {}
  render() {
    return (
      <div>
        <footer className="footer_sec">
          
          <div className="container">
            <div className="footer_menu">
              <div className="row">
                <div className="col-md-6 col-lg-3">
                  <h6 className="white_text font_bold head_h6">About Us</h6>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/aboutus">Company</Link>
                    </li>
                    <li>
                      <Link to="/publications-blog-industry-videos">
                        Publications
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 col-lg-3">
                  <h6 className="white_text font_bold head_h6">Program</h6>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/how-it-works">How it Works</Link>
                    </li>
                    <li>
                      <Link to="/program/usecase/rideshare">
                        Rideshare/delivery
                      </Link>
                    </li>
                    <li>
                      <Link to="/program/usecase/regular-use">Regular use</Link>
                    </li>
                    <li>
                      <Link to="/faq">FAQ</Link>
                    </li>
                  </ul>
                </div>
                {/*}
                <div className="col-md-6 col-lg-3">
                  <h6 className="white_text font_bold head_h6">
                    Popular Cities
                  </h6>
                  <ul className="list-unstyled">
                    <li>
                      <a href="/cars/city=indianapolis">Indianapolis, IN</a>
                    </li>
                    <li>
                      <a href="/cars/city=detroit">Detroit, MI</a>
                    </li>
                    <li>
                      <a href="/cars/city=lancaster">Lancaster, PA</a>
                    </li>
                    <li>
                      <a href="/cars/city=windsor_locks">Windsor Locks, CT</a>
                    </li>
                  </ul>
                  </div>
                {*/}
                <div className="col-md-6 col-lg-3">
                 {/*} 
                  <h6 className="white_text font_bold head_h6">Our Address</h6>
                  <p>14 Kings Hwy Haddonfield, NJ 08033</p>
                  {*/}
                  <div className="social_box d-flex">
                    <a
                      className="d-flex align-items-center justify-content-center"
                      href="https://www.facebook.com/driveitaway"
                      title=""
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                    <a
                      className="d-flex align-items-center justify-content-center"
                      href="https://www.instagram.com/driveitaway/"
                      title=""
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                    <a
                      className="d-flex align-items-center justify-content-center"
                      href="https://twitter.com/driveitaway/"
                      title=""
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <section className="copy_right">
          <div className="container text-center">
            <p className="white_text">
              Copyright ©DriveItAway Inc. 2021. All rights reserved
            </p>
          </div>
        </section>
      </div>
    );
  }
}
export default Footer;
