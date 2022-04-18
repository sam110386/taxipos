import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import OtpInput from "react-otp-input";
import { verifyAccount } from "../../services/AuthApi";
import { FullPageLoader } from "../Loaders";

const optSchema = Yup.object().shape({
  otp: Yup.string()
    .min(5)
    .max(5)
    .required("Please enter activation code"),
});

const OTPForm = ({ onSuccess, onError }) => {
  const [submiting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const res = await verifyAccount({ activationCode: values.otp });
      setSubmitting(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          onSuccess(res.data);
          return;
        }
        onError(res.data.message);
      }
    } catch (err) {
      setSubmitting(false);
      onError();
    }
  };

  return (
    <React.Fragment>
      <div className="position-relative d-flex align-items-center">
        <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={optSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ setFieldValue, values, submitForm }) => (
            <div className="w-100">
              <div className="account_box" id="show_hide_password">
                <h4 className="blue_text">Enter Code</h4>
                <div className="row">
                  <div className="col-12 form-group ">
                    <label className="form_lbl">Activation Code</label>
                    <Field
                      name="otp"
                      component={OtpInput}
                      containerStyle="form-control d-flex justify-content-between pl-0 pr-0"
                      inputStyle="otp_box"
                      value={values.otp}
                      onChange={(v) => setFieldValue("otp", v)}
                      numInputs={5}
                      separator={<span />}
                    />
                    <div className="text-right resend_code">
                      <Link className="blue_text" to="#" title="">
                        Resend Code
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn update_btn w-100"
                  onClick={submitForm}
                  disabled={values.otp.length !== 5}
                >
                  Register
                </button>
              </div>

              <h6 className="text-center login_account">
                Already have an account?
                <Link className="blue_text" to="/login" title="">
                  Login
                </Link>
              </h6>
            </div>
          )}
        </Formik>
      </div>
      {submiting && <FullPageLoader />}
    </React.Fragment>
  );
};

export default OTPForm;
