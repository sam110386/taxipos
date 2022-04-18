import React from "react";
import { NavLink } from "react-router-dom";

const SideMenu = ({ children }) => {
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-3 col-md-3 mb-4">
          <div className="profileTab">
            <ul className="nav nav-pills d-block" id="pills-tab" role="tablist">
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link d-flex align-items-center justify-content-between"
                  to="/account/"
                  exact
                >
                  <span>Update My Profile</span>
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link d-flex align-items-center justify-content-between"
                  to="/account/change-password"
                >
                  <span>Change Password</span>
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link d-flex align-items-center justify-content-between"
                  to="/account/upload-license"
                >
                  <span>Driving License</span>
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link d-flex align-items-center justify-content-between"
                  to="/account/my-payments"
                >
                  <span>My Payments</span>
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link d-flex align-items-center justify-content-between"
                  to="/account/payment-methods"
                >
                  <span>Payment Methods</span>
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link d-flex align-items-center justify-content-between"
                  to="/account/wishlist-vehicles"
                >
                  <span>Favorites</span>
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link d-flex align-items-center justify-content-between"
                  to="/account/prequalify"
                >
                  <span>Prequalify</span>
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link d-flex align-items-center justify-content-between"
                  to="/account/invite-friends"
                >
                  <span>Invite Friends</span>
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-9 col-md-9">{children}</div>
      </div>
    </div>
  );
};

export default SideMenu;
