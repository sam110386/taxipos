import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LoginMobile from "../LoginBlocks/LoginMobile";
import LoginPassword from "../LoginBlocks/LoginPassword";
import LoginOTP from "../LoginBlocks/LoginOTP";
import { loginSuccess } from "../../store/actions/AuthAction";
import { ErrorDialog } from "../Dialogs";
import { hideLoginModal } from "../../store/actions/GlobalActions";

const LoginModal = ({ showLoginModal }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSuccess = (data) => {
    dispatch(loginSuccess(data.auth_token, data.result));
    dispatch(hideLoginModal());
  };

  const handleUserLogin = (next_step, user_id) => {
    setStep(next_step);
    if (user_id) {
      setUserId(user_id);
    }
  };

  const onError = (message) => {
    setErrorMessage(message);
    setError(true);
  };

  const onDialogClose = () => {
    setError(false);
    setErrorMessage("");
  };

  const closeModal = () => {
    dispatch(hideLoginModal());
  };

  if (!showLoginModal) return null;

  return (
    <div className="dialog-wrapper">
      <div className="align-items-center justify-content-center login-modal-container ">
        <div className="dialog-body">
          <section className="d-block">
            <div className="row position-relative">
              <div className="col-lg-6 col-md-6 regLogo_box d-flex align-items-center justify-content-center">
                <Link className="reg_logo" to="/">
                  <img src="/images/logo_white.png" alt="" />
                </Link>
                <div className="copyRight position-absolute">
                  <p className="white_text">© Copyright All Rights Reserved</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 reg_form login-reg_form">
                {step === 1 && (
                  <LoginMobile onSuccess={handleUserLogin} onError={onError} />
                )}
                {step === 2 && (
                  <LoginPassword
                    onSuccess={onSuccess}
                    userId={userId}
                    onError={onError}
                  />
                )}
                {step === 3 && (
                  <LoginOTP onSuccess={onSuccess} onError={onError} />
                )}
              </div>
            </div>
            {error && (
              <ErrorDialog message={errorMessage} onClose={onDialogClose} />
            )}
          </section>
        </div>
        <div className="login-footer ">
          <button className="btn btn-danger" onClick={closeModal}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToPops = (state) => {
  const { showLoginModal } = state.global;
  return { showLoginModal };
};

export default connect(mapStateToPops)(LoginModal);
