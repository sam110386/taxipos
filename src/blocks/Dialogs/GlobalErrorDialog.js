import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../../store/actions/AuthAction";

const GlobalErrorDialog = () => {
  const dispatch = useDispatch();

  const { authError } = useSelector((state) => {
    return {
      authError: state.auth.authError,
    };
  });

  const logoutUser = async () => {
    dispatch(signOutUser());
    setTimeout(()=>{
      window.location = "/";
    },120);
  };
  if(!authError) return null;
  return (
    <div className="dialog-wrapper">
      <div className="align-items-center justify-content-center dialog-container">
        <div className="dialog-body">
          <div className="logo">
            <img src="/images/logo.png" alt="" />
          </div>

          <div>
            <p className="text-dark">
              {authError || "Sorry! something went wrong."}
            </p>
          </div>
        </div>
        <div className="footer">
          <button className="btn update_btn" onClick={logoutUser}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorDialog;
