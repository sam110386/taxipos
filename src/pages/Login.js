import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginMobile from "../blocks/LoginBlocks/LoginMobile";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/actions/AuthAction";
import { ErrorDialog } from "../blocks/Dialogs";

const Login = () => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSuccess = (data) => {
    dispatch(loginSuccess(data.auth_token, data.result));
    if (window.history.length > 0) window.history.back();
    else window.location.href = "/";
  };

  /*const handleUserLogin = (next_step, user_id) => {
    setStep(next_step);
    if (user_id) {
      setUserId(user_id);
    }
  };*/

  const onError = (message) => {
    setErrorMessage(message);
    setError(true);
  };

  const onDialogClose = () => {
    setError(false);
    setErrorMessage("");
  };

  return (
    <section className="reg_sec container-fluid">
      <div className="row position-relative">
        
        <div className="col-lg-4 col-sm-12 reg_form offset-lg-4 offset-sm-0">
            <LoginMobile onSuccess={onSuccess} onError={onError} />
        </div>
      </div>
      {error && <ErrorDialog message={errorMessage} onClose={onDialogClose} />}
    </section>
  );
};

export default Login;
