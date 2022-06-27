import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../store/actions/AuthAction";
import { ConfirmDialog } from "../blocks/Dialogs";
import TriplogWrap from "../blocks/Triplog/TriplogWrap";

const Dispatcher = ({ isSticky }) => {
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
      <TriplogWrap />
  );
};

export default Dispatcher;
