import React from "react";
import { connect } from "react-redux";
import { UploadLicenseForm } from "../../blocks/UserDashboard";
import { loadUserDetail } from "../../store/actions/UserAction";

const UploadLicense = ({ userDetails, updateDetails, refreshUserDetail }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <UploadLicenseForm />
        </div>
      </div>
    </div>
  );
};

const mapStateToPops = (state) => {
  const { userLoggedIn, userDetails } = state.auth;
  return { userLoggedIn, userDetails };
};

const mapDispatchToPops = (dispatch) => {
  return {
    refreshUserDetail: () => dispatch(loadUserDetail()),
  };
};

export default connect(
  mapStateToPops,
  mapDispatchToPops
)(UploadLicense);
