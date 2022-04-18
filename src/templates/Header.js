import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../store/actions/AuthAction";
import { ConfirmDialog } from "../blocks/Dialogs";

const Header = ({ isSticky }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return {
      user: state.auth,
    };
  });

  const [showLogoutConfirmDialog, setShowLogoutConfirmDialog] = useState(false);

  const getUserNameLetters = () => {
    if (user.userDetails) {
      return user.userDetails.SubUserName[0];
    } else return "";
  };

  const getUserName = () => {
    return user.userDetails.SubUserName;
  };

  const logoutUser = async () => {
    dispatch(signOutUser());
  };

  return (
    <header className={`header landingheader ${isSticky && "sticky-header"}`}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <img src="/images/mindseye.png" alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto justify-content-end">
              
             
             
              {user.userLoggedIn && (
                <>
                  
                  <li className="nav-item dropdown user_dropdown">
                    <NavLink
                      className="nav-link position-relative dropdown-toggle d-flex align-items-center"
                      to="#"
                      title="App Store"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="user_img d-flex align-items-center justify-content-center">
                        {getUserNameLetters()}
                      </span>
                      {/* <img
                        src={user.userDetails.photo}
                        alt=""
                        className="user-avatar mr-2"
                      />{" "} */}
                      <span>{getUserName()}</span>
                    </NavLink>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="userDropdown"
                    >
                      <NavLink
                        className="dropdown-item"
                        to="/account"
                        title="My Profile"
                      >
                        My Setting
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        to="/dispatcher/triplog"
                        title="Triplog"
                      >
                        Triplog
                      </NavLink>
                      
                      <button
                        className="dropdown-item"
                        title="Logout"
                        onClick={logoutUser}
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ml-auto justify-content-end">
            {!user.userLoggedIn && (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link login_color">
                    LOG IN
                </NavLink>
              </li>
            )}
            
            </ul>
          </div>
        </div>
      </nav>
      {showLogoutConfirmDialog && (
        <ConfirmDialog
          message={"Dou you want to logout ?"}
          onAccept={logoutUser}
          onCancel={() => setShowLogoutConfirmDialog(false)}
        />
      )}
    </header>
  );
};

export default Header;
