import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { ErrorDialog } from "../../blocks/Dialogs";
import Loader from "../../blocks/Loader";
import { changePassword } from "../../services/userServices";

const changePasswordSchema = Yup.object().shape({
  old_password: Yup.string().required("Please enter your old password"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Please enter new password"),
  confirm_password: Yup.string()
    .required("Please enter confirm your password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password and Confirm Password didn't match"
      ),
    }),
});

const ChangePassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values) => {
    setSubmitting(true);
    const data = {
      old_password: values.old_password,
      password: values.password,
    };

    try {
      const res = await changePassword(data);
      setSubmitting(false);
      if (res && res.status === 200) {
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

  return (
    <div>
      <Formik
        initialValues={{
          old_password: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={changePasswordSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched, submitForm, values }) => (
          <div>
            <div className="account_box update_pwd" id="show_hide_password">
              <h6 className="blue_text">Update Your Password</h6>
              <div className="row">
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">Old Password</label>
                  <Field
                    name="old_password"
                    type="password"
                    className="form-control"
                    placeholder="old password"
                  />
                  {errors.old_password && touched.old_password && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.old_password}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">New Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="new password"
                  />
                  {errors.password && touched.password && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-6 col-lg-4">
                  <label className="form_lbl">Confirm Password</label>
                  <Field
                    name="confirm_password"
                    type="password"
                    className="form-control"
                    placeholder="confirm password"
                  />
                  <button type="button" className="show_pass">
                    <i className="fa fa-eye" aria-hidden="true" />
                  </button>
                  {errors.confirm_password && touched.confirm_password && (
                    <div className="d-block invalid-feedback ml-1">
                      {errors.confirm_password}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button className="btn update_btn w-100" onClick={submitForm}>
              Update Password
            </button>
          </div>
        )}
      </Formik>
      {isError && <ErrorDialog message={errorMessage} onClose={closeDialog} />}
      {submitting && <Loader />}
    </div>
  );
};

export default ChangePassword;
