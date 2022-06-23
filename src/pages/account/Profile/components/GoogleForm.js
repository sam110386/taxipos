import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { googlekeyaction } from "../../../../store/actions/ProfileAction";

function GoogleForm() {
  const dispatch = useDispatch();
  const GoogleSchema = Yup.object().shape({
    googleapikey: Yup.string().required("required"),
  });
  const formik = useFormik({
    initialValues: {
      googleapikey: "",
    },
    validationSchema: GoogleSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(googlekeyaction(values));
      resetForm({ values: "" });
    },
  });

  return (
    <div className="row justify-content-between text-left">
      <div className="form-group col-sm-6 flex-column d-flex">
        {" "}
        <label className="form-control-label px-3">
          Google Place Api Key<span className="text-danger"> *</span>
        </label>{" "}
        <input
          type="text"
          name="googleapikey"
          value={formik.values.googleapikey}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your Google Place Api Key"
        />{" "}
        {formik.errors.googleapikey && formik.touched.googleapikey && (
          <span className="text-danger">{formik.errors.googleapikey}</span>
        )}
      </div>
      <div className="form-group col-sm-6 flex-column d-flex">
        {" "}
        <label className="form-control-label px-3">
          <span className="text-danger"> </span>
        </label>{" "}
        <button
          style={{ marginTop: "28px" }}
          className="btn-block btn-primary"
          onClick={formik.handleSubmit}
        >
          Submit Google Key
        </button>{" "}
      </div>
    </div>
  );
}

export default GoogleForm;
