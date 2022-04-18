import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { loginAdvance } from "../../services/AuthApi";

const passwordSchema = Yup.object().shape({
  password: Yup.string().required(),
});

const LoginOTP = ({ onSuccess, userId, onError }) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      values["user_id"] = userId;
      const res = await loginAdvance(values);
      setSubmitting(false);
      if (res && res.status === 200) {
        if (res.data.status === 1) {
          onSuccess(res.data);
          return;
        } else {
          onError(res.data.message);
        }
      }
    } catch (err) {
      onError("Someting went wrong");
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <div className="position-relative d-flex align-items-center">
        <Formik
          initialValues={{ password: "" }}
          validationSchema={passwordSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ touched, errors, submitForm }) => (
            <div className="w-100">
              <div className="account_box" id="show_hide_password">
                <h4 className="blue_text">Welcome Back!</h4>
                <div className="row">
                  <div className="form-group col-md-12">
                    <div className="resend_code">
                      <label className="form_lbl">Enter Your Password</label>
                      <Field
                        type="password"
                        className="form-control"
                        placeholder=""
                        name="password"
                      />
                    </div>
                    {errors.password && touched.password && (
                      <div className="d-block invalid-feedback ml-1">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn update_btn w-100"
                  onClick={submitForm}
                  disabled={submitting}
                >
                  Login
                </button>
              </div>
              <h6 className="text-center login_account">
                Already have an account?
                <Link className="blue_text" to="/register" title="">
                  Register
                </Link>
              </h6>
            </div>
          )}
        </Formik>
      </div>
      {submitting && <Loader />}
    </React.Fragment>
  );
};

export default LoginOTP;
