import React from "react";
import { connect } from "react-redux";
import { hideDrivingLicenseModal } from "../../store/actions/GlobalActions";
import { UploadLicenseForm } from "../UserDashboard";

const DrivingLicenseModal = ({
  showDrivingLicenseModal,
  closeDrivingLicenseModal,
  onResult,
}) => {
  const onResponse = (message) => {
    onResult(message);
    closeModal();
  };

  const closeModal = () => {
    closeDrivingLicenseModal();
  };

  if (!showDrivingLicenseModal) return null;

  return (
    <div className="dialog-wrapper">
      <div className="align-items-center justify-content-center  license-dialog-container position-relative">
        <div className="modal-header">
          <h5 className="modal-title">Upload License</h5>
          <button
            type="button"
            className="close-btn btn-close font-weight-cold"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div className="dialogbody py-3">
          <div className="row1">
            <div className="col-12">
              <UploadLicenseForm onResponse={onResponse} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToPops = (state) => {
  const { showDrivingLicenseModal } = state.global;
  return { showDrivingLicenseModal };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrivingLicenseModal: () => dispatch(hideDrivingLicenseModal()),
  };
};
export default connect(mapStateToPops, mapDispatchToProps)(DrivingLicenseModal);
