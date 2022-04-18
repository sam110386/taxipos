import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { login } from "../../services/AuthApi";
import { ErrorDialog } from "../Dialogs";

const LoginSchema = Yup.object().shape({
  email:Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  password: Yup.string()
    .required("Please enter password")
});

const LoginOTP = ({ onSuccess }) => {
  const link_container_ref = useRef();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openLink = (url_link) => {
    if (url_link && link_container_ref.current) {
      const link = document.createElement("a");
      link.href = url_link;
      link.target = "_blank";
      link_container_ref.current.appendChild(link);
      link.click();
      link_container_ref.current.removeChild(link);
    }
  };

  const handleSubmit = async (values) => {

    try {
      setSubmitting(true);
      const res = await login(values);
      setSubmitting(false);
      if (res && res.status === 200) {
        if (res && res.status === 200) {
          if (res.data.status === 1) {
            onSuccess(res.data);
            return;
          } else {
            setErrorMessage(res.data.message);
            setError(true);
          }
        }
      }
    } catch (e) {
      setSubmitting(false);
      setError(true);
    }
  };

  const onDialogClose = () => {
    setError(false);
    setErrorMessage("");
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ touched, errors, submitForm }) => (
          <div className="position-relative d-flex align-items-center">
            <div className="w-100">
              <div className="account_box">
                <h4 className="blue_text">Welcome Back!</h4>
                <div className="row">
                  <div className="form-group col-md-12">
                    <label className="form_lbl">Email</label>
                    <Field
                      type="text"
                      name="email"
                      className={`form-control ${
                        touched.email && errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder=""
                      
                    />
                    {errors.email && touched.email ? (
                    <div className="d-block invalid-feedback mt-n4 ml-3">
                      {errors.email}
                    </div>
                  ) : null}
                  </div>
                  </div>
                  <div className="row">
                  <div className="form-group col-md-12">
                    <label className="form_lbl">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className={`form-control ${
                        touched.password && errors.password
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder=""
                      
                    />
                    {errors.password && touched.password ? (
                    <div className="d-block invalid-feedback mt-n4 ml-3">
                      {errors.password}
                    </div>
                  ) : null}
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
            </div>
          </div>
        )}
      </Formik>
      {submitting && <Loader />}
      {error && <ErrorDialog message={errorMessage} onClose={onDialogClose} />}
      <div ref={link_container_ref} />
    </React.Fragment>
  );
};

export default LoginOTP;
