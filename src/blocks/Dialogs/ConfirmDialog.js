import React from "react";

const ConfirmDialog = ({
  confirmText,
  cancelText,
  message,
  onAccept,
  onCancel,
}) => {
  return (
    <div className="dialog-wrapper">
      <div className="align-items-center justify-content-center dialog-container">
        <div className="dialog-body">
          <div className="logo">
            <img src="/images/logo.png" alt="" />
          </div>
          <div className="text">
            <h6>Are you sure ?</h6>
            <p className="text-dark">{message}</p>
          </div>
        </div>
        <div className="footer">
          <button className="btn update_btn  btn-small" onClick={onAccept}>
            {confirmText || "Yes"}
          </button>
          <button className="btn update_btn" onClick={onCancel}>
            {cancelText || "No"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
