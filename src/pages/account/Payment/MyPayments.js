import React, { useEffect } from "react";
import { connect } from "react-redux";
import MyPaymentList from "../../../blocks/UserDashboard/MyPaymentList";
import { removeOfferDetail } from "../../../store/actions/UserAction";

const MyPayments = ({ clearOfferData }) => {
  useEffect(() => {
    clearOfferData();
  }, []);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h2>My Payments</h2>
        </div>
        <div className="col-12">
          <hr />
        </div>
        <div className="col-12">
          <MyPaymentList />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToPops = (dispatch) => {
  return {
    clearOfferData: () => dispatch(removeOfferDetail()),
  };
};

export default connect(null, mapDispatchToPops)(MyPayments);
