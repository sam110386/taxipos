import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { phoneRegExp } from "../../utils/constants";
import { register } from "../../services/AuthApi";

const registrationSchema = Yup.object().shape({
  first_name: Yup.string().required("Please enter first name"),
  // middle_name: Yup.string(),
  last_name: Yup.string().required("Please enter last name"),
  phone_number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter phone number"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Please enter password"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password and Confirm Password didn't match"
      ),
    }),
  email: Yup.string()
    .email("Wrong email format")
    .required("Please enter email address"),
  photo_data: Yup.string(),
  fileformat: Yup.string(),
  acceptTerms: Yup.bool()
    .required("You must accept the terms and conditions")
    .oneOf([true], "The terms and conditions must be accepted."),
});

const initialData = {
  first_name: "",
  middle_name: "",
  last_name: "",
  phone_number: "",
  password: "",
  confirm_password: "",
  email: "",
  photo_data: "",
  fileformat: "",
  acceptTerms: false,
};

const RegisterForm = ({ onSuccess, onError }) => {
  const formRef = useRef();
  const fileRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState("upload image");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const onFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file_size = e.target.files[0].size / (2 * 1024 * 1024);
      if (file_size > 1) {
        if (formRef.current) {
          formRef.current.setFieldTouched("photo_data", true, false);
          formRef.current.setFieldError(
            "photo_data",
            "Please upload file upto 2MB"
          );
        }
        return;
      }
      setFileName(e.target.files[0].name);
      if (formRef.current) {
        formRef.current.setFieldValue("fileformat", e.target.files[0].name);
      }
      var fr = new FileReader();
      fr.onload = function() {
        if (formRef.current) {
          formRef.current.setFieldValue("photo_data", fr.result);
        }
      };
      fr.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      let data = { ...values };
      delete data["confirm_password"];
      delete data["acceptTerms"];

      const res = await register(data);
      setSubmitting(false);
      if (res && res.status === 200) {
        if (res.data) {
          if (res.data.status === 1) {
            onSuccess();
            return;
          }
          onError(res.data.message);
        }
      }
    } catch (err) {
      setSubmitting(false);
      onError();
    }
  };

  const openFileChooser = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <React.Fragment>
      {/* <form> */}
      <Formik
        initialValues={initialData}
        validationSchema={registrationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        innerRef={formRef}
      >
        {({ touched, errors, submitForm }) => (
          <>
            <div className="account_box" id="show_hide_password">
              <h4 className="blue_text">Register with Us</h4>
              <div className="row">
                <div className="form-group col-md-12">
                  <label className="form_lbl">First Name*</label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="first_name"
                  />
                  {errors.first_name && touched.first_name && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.first_name}
                    </div>
                  )}
                </div>

                {/* <div className="form-group col-md-6">
                  <label className="form_lbl">Middle Name*</label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="middle_name"
                  />
                  {errors.middle_name && touched.middle_name && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.middle_name}
                    </div>
                  )}
                </div> */}
                <div className="form-group col-md-12">
                  <label className="form_lbl">Last Name*</label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="last_name"
                  />
                  {errors.last_name && touched.last_name && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.last_name}
                    </div>
                  )}
                </div>
                <div className="col-md-12">
                  <h6 className="blue_text">Upload Image</h6>
                  <div className="file_upload">
                    <div>
                      <label
                        className="upload_btn d-flex justify-content-between"
                        htmlFor="exampleFormControlFile2"
                      >
                        <span>
                          <img src="img/upload.svg" alt="" />
                          Upload Photo
                        </span>
                        <span
                          className="d-flex justify-content-between upload_photo btn"
                          onClick={openFileChooser}
                        >
                          <span>{fileName}</span>
                          <Link to="#">
                            <img src="img/close.png" alt="" />
                          </Link>
                        </span>
                      </label>
                      <input
                        name="photo_data"
                        type="file"
                        ref={fileRef}
                        className="form-control-file d-none"
                        onChange={onFileChange}
                      />
                    </div>
                    <small className="blue_text d-block text-right">
                      *Maximum upload file size is <b>2MB</b> *Allowed formats:{" "}
                      <b>JPEG,PNG</b>
                    </small>
                    {errors.photo_data && touched.photo_data && (
                      <div className="d-block invalid-feedback ml-1">
                        {errors.photo_data}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-12">
                  <label className="form_lbl">Phone</label>
                  <Field
                    name="phone_number"
                    type="text"
                    className="form-control"
                    placeholder=""
                    maxLength="10"
                  />
                  {errors.phone_number && touched.phone_number && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.phone_number}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-12">
                  <label className="form_lbl">Email*</label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder=""
                  />
                  {errors.email && touched.email && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-12">
                  <label className="form_lbl">Password*</label>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder=""
                  />
                  <button
                    type="button"
                    className="show_pass"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {errors.password && touched.password && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-12">
                  <label className="form_lbl">Confirm Password*</label>
                  <Field
                    name="confirm_password"
                    type={showCPassword ? "text" : "password"}
                    className="form-control"
                    placeholder=""
                  />
                  <button
                    type="button"
                    className="show_pass"
                    onClick={() => setShowCPassword(!showCPassword)}
                  >
                    <i
                      className={`fa ${
                        showCPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {errors.confirm_password && touched.confirm_password && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.confirm_password}
                    </div>
                  )}
                </div>
                {/* <div className="form-group col-md-12">
                  <label className="form_lbl">Zip Code</label>
                  <Field
                    name=""
                    type="text"
                    className="form-control"
                    placeholder=""
                  />
                </div> */}
              </div>
            </div>
            <div className="agreement_div">
              <div className="custom-control custom-radio">
                <Field
                  type="checkbox"
                  id="customRadio1"
                  name="acceptTerms"
                  className="custom-control-input"
                />
                <label className="custom-control-label" htmlFor="customRadio1">
                  I have read and agree to the following
                </label>
                <a
                  className="blue_text agreement"
                  href="https://www.driveitaway.com/app-terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>
                &nbsp;&&nbsp;
                <a
                  className="blue_text agreement"
                  href="https://www.driveitaway.com/app-privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </div>
              {errors.acceptTerms && touched.acceptTerms && (
                <div className="d-block invalid-feedback ml-1">
                  {errors.acceptTerms}
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="btn update_btn w-100"
                onClick={submitForm}
              >
                Register
              </button>
            </div>
          </>
        )}
      </Formik>
      {/* </form> */}
      <h6 className="text-center login_account">
        Already have an account?&nbsp;
        <Link className="blue_text" to="/login" title="">
          Login
        </Link>
      </h6>
      {submitting && <Loader />}
    </React.Fragment>
  );
};

export default RegisterForm;
