import React, { useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { ErrorDialog } from "../../blocks/Dialogs";
import Loader from "../../blocks/Loader";
import { updateUserProfile } from "../../services/userServices";
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { updateUserDetail } from "../../store/actions/AuthAction";

const editProfileSchema = Yup.object().shape({
  photo_data: Yup.string(),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  dob: Yup.string(),
  address: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zip: Yup.string(),
  auto_renew: Yup.bool(),
});

const EditProfile = ({ userDetails, updateDetails, refreshUserDetail }) => {
  const formRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [fileFormat, setFileFormat] = useState("");

  useMemo(() => {
    if (formRef.current) {
      formRef.current.setFieldValue(
        "dob",
        moment(selectedDate._d).format("MM/DD/YYYY")
      );
    }
  }, [selectedDate]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const data = {
        ...values,
      };
      if (data.photo_data) {
        data["fileformat"] = fileFormat;
      }

      const res = await updateUserProfile(data);
      setSubmitting(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          refreshUserDetail(res.data.result);
        }
        setErrorMessage(res.data.message);
        setIsError(true);
        return;
      }
      setErrorMessage("Sorry! something went wrong.Please reload your page.");
      setIsError(true);
    } catch (err) {
      setSubmitting(false);
      setErrorMessage("Sorry! something went wrong.Please reload your page.");
      setIsError(true);
    }
  };

  const closeDialog = () => {
    setErrorMessage("");
    setIsError(false);
  };

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
      const splits = e.target.files[0].name.split(".");
      setFileFormat(splits[splits.length - 1] || "jpg");
      let fr = new FileReader();
      fr.onload = function() {
        if (formRef.current) {
          formRef.current.setFieldValue("photo_data", fr.result);
        }
      };
      fr.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          first_name: userDetails.first_name,
          last_name: userDetails.last_name,
          photo_data: "",
          address: userDetails.address,
          city: userDetails.city,
          state: userDetails.state,
          zip: userDetails.zip,
          dob: userDetails.dob,
          auto_renew: userDetails.auto_renew === "1" ? true : false,
        }}
        validationSchema={editProfileSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        innerRef={formRef}
      >
        {({ errors, touched, setFieldValue, submitForm, values }) => (
          <div>
            <div className="avatar-upload">
              <div className="avatar-edit">
                <input
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  onChange={onFileChange}
                />
                <label
                  className="d-flex align-items-center justify-content-center"
                  htmlFor="imageUpload"
                />
              </div>
              <div className="avatar-preview">
                <div
                  id="imagePreview"
                  className="bg-image"
                  style={{
                    background: `url(${values.photo_data ||
                      userDetails.photo})`,
                  }}
                />
              </div>
            </div>
            <div className="account_box">
              <h6 className="blue_text">Personal Information</h6>
              <div className="row">
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">Full Name</label>
                  <Field
                    name="first_name"
                    type="text"
                    className="form-control"
                    placeholder="First name"
                  />
                  {errors.first_name && touched.first_name && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.first_name}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">Last Name</label>
                  <Field
                    name="last_name"
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                  />
                  {errors.last_name && touched.last_name && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.last_name}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    disabled
                    value={userDetails.email}
                  />
                </div>
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">Phone Number</label>
                  <Field
                    name="contact_number"
                    type="text"
                    className="form-control"
                    placeholder="Contact number"
                    disabled
                    value={userDetails.contact_number}
                  />
                </div>
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">Date of Birth</label>
                  <Field
                    name="dob"
                    id="dob"
                    type="text"
                    className="form-control"
                    placeholder="Date of birth"
                    onClick={() => setOpenDatePicker(!openDatePicker)}
                  />
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      value={selectedDate}
                      onChange={setSelectedDate}
                      open={openDatePicker}
                      className="d-none"
                      disableFuture
                      onAccept={() => setOpenDatePicker(!openDatePicker)}
                      onClose={() => setOpenDatePicker(!openDatePicker)}
                      format="mm/dd/yyyy"
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </div>
            <div className="account_box">
              <h6 className="blue_text">Update Address Information</h6>
              <div className="row">
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">Address</label>
                  <Field
                    name="address"
                    type="text"
                    className="form-control"
                    placeholder="Address"
                  />
                </div>
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">City</label>
                  <Field
                    name="city"
                    type="text"
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">State</label>
                  {/* <select name="state" className="form-control">
                    <option>New York</option>
                    <option>New York</option>
                    <option>New York</option>
                  </select> */}
                  <Field
                    name="state"
                    type="text"
                    className="form-control"
                    placeholder="State"
                  />
                </div>
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">Zip</label>
                  <Field
                    name="zip"
                    type="text"
                    className="form-control"
                    placeholder="Zip"
                  />
                </div>
                <div className="form-group col-md-6 col-lg-4 agreement_div d-flex align-items-center">
                  <div className="custom-control custom-radio">
                    <Field
                      type="checkbox"
                      id="auto_renew"
                      name="auto_renew"
                      className="custom-control-input login-checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="auto_renew"
                    >
                      Order Auto Renew
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={submitForm}
              type="submit"
              className="btn update_btn w-100"
            >
              Update Profile
            </button>
          </div>
        )}
      </Formik>
      {isError && <ErrorDialog message={errorMessage} onClose={closeDialog} />}
      {submitting && <Loader />}
    </div>
  );
};

const mapStateToPops = (state) => {
  const { userLoggedIn, userDetails } = state.auth;
  return { userLoggedIn, userDetails };
};

const mapDispatchToPops = (dispatch) => {
  return {
    refreshUserDetail: (data) => dispatch(updateUserDetail(data)),
  };
};

export default connect(
  mapStateToPops,
  mapDispatchToPops
)(EditProfile);
