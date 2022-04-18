import React, { useEffect } from "react";
import { connect } from "react-redux";
import MyOffersList from "../../../blocks/UserDashboard/MyOfferList";
import { removeOfferDetail } from "../../../store/actions/UserAction";

const MyOffers = ({ clearOfferData }) => {
  useEffect(() => {
    clearOfferData();
  }, []);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h2>My Offers</h2>
        </div>
        <div className="col-12">
          <hr />
        </div>
        <div className="col-12">
          <MyOffersList />
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

export default connect(null, mapDispatchToPops)(MyOffers);
