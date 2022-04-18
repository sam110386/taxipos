import React from "react";

const ErrorDialog = ({ message, onClose }) => {
  return (
    <div className="dialog-wrapper">
      <div className="align-items-center justify-content-center dialog-container">
        <div className="dialog-body">
          <div className="logo">
            <img src="/images/logo.png" alt="" />
          </div>

          <div>
            <p className="text-dark">
              {message || "Sorry! something went wrong."}
            </p>
          </div>
        </div>
        <div className="footer">
          <button className="btn update_btn" onClick={onClose}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDialog;
