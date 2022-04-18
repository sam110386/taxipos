import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import UserSideMenu from "./UserSideMenu";

import EditProfile from "../pages/account/EditProfile";
import UploadLicense from "../pages/account/UploadLicense";
import ChangePassword from "../pages/account/ChangePassword";
import Prequalify from "../pages/account/Prequalify";
import Bookings from "../pages/account/Bookings";
import BookingDetail from "../pages/account/BookingDetail";
import PendingBookingDetail from "../pages/account/PendingBookingDetail";
import WishListVehicles from "../pages/account/WishListVehicles";
import MyOffers from "../pages/account/MyOffers";
import MyOfferDetail from "../pages/account/MyOffers/MyOfferDetail";
import ConfirmBooking from "../pages/account/MyOffers/ConfirmBooking";
import MyPayments from "../pages/account/Payment/MyPayments";
import PaymentMethods from "../pages/account/Payment/PaymentMethods";
import InviteFirends from "../pages/account/InviteFirends";

const UserAccount = ({ page, userLoggedIn }) => {
  const getPage = () => {
    switch (page) {
      case "editprofile":
        return (
          <UserSideMenu>
            <EditProfile />
          </UserSideMenu>
        );
      case "uploadlicense":
        return (
          <UserSideMenu>
            <UploadLicense />
          </UserSideMenu>
        );
      case "changepassword":
        return (
          <UserSideMenu>
            <ChangePassword />
          </UserSideMenu>
        );
      case "prequalify":
        return (
          <UserSideMenu>
            <Prequalify />
          </UserSideMenu>
        );
      case "wishlistvehicles":
        return <WishListVehicles />;
      case "bookings":
        return <Bookings />;
      case "myoffers":
        return <MyOffers />;
      case "myofferdetails":
        return <MyOfferDetail />;
      case "myofferconfirmbooking":
        return <ConfirmBooking />;
      case "bookingdetail":
        return <BookingDetail />;
      case "pendingbookingdetail":
        return <PendingBookingDetail />;
      case "mypayments":
        return (
          <UserSideMenu>
            <MyPayments />
          </UserSideMenu>
        );

      case "paymentmethods":
        return (
          <UserSideMenu>
            <PaymentMethods />
          </UserSideMenu>
        );
      case "invitefriends":
        return (
          <UserSideMenu>
            <InviteFirends />
          </UserSideMenu>
        );
      default:
        return (
          <UserSideMenu>
            <EditProfile />
          </UserSideMenu>
        );
    }
  };

  if (!userLoggedIn) {
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    window.darkHeader(false);
  }, []);

  return (
    <div>
      <Header />
      <div style={{ marginTop: "8rem" }}>{getPage()}</div>
      <Footer />
    </div>
  );
};

const mapStateToPops = (state) => {
  const { userLoggedIn } = state.auth;
  return { userLoggedIn };
};

const mapDispatchToPops = (dispatch) => {
  return {};
};

export default connect(mapStateToPops, mapDispatchToPops)(UserAccount);
