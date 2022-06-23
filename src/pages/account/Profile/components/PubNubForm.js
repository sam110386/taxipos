import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { pubnubkeyaction } from "../../../../store/actions/ProfileAction";

function PubNubForm() {
    const dispatch = useDispatch()
  const PubNubSchema = Yup.object().shape({
    publishkey: Yup.string().required("required"),
    subscribekey: Yup.string().required("required"),
    secretkey: Yup.string().required("required"),
  });
  const formik = useFormik({
    initialValues: {
      publishkey: "",
      subscribekey: "",
      secretkey: "",
    },
    validationSchema: PubNubSchema,
    onSubmit: (values,{resetForm}) => {
     dispatch(pubnubkeyaction(values))
     resetForm({values:""})
    },
  });

  return (
    <>
    <form onSubmit={formik.handleSubmit}>
     <div class="row justify-content-between text-left">
                  <div class="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <label class="form-control-label px-3">
                      Publish key<span class="text-danger"> *</span>
                    </label>{" "}
                    <input
                      type="text"
                      name="publishkey"
                      placeholder="Enter your first Publish key"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.publishkey}
                    />{" "}
                     {formik.errors.publishkey && formik.touched.publishkey && (
          <span className="text-danger" >{formik.errors.publishkey}</span>
        )}
                  </div>
                  <div class="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <label class="form-control-label px-3">
                      Subscribe Key<span class="text-danger"> *</span>
                    </label>{" "}
                    <input
                      type="text"
                      name="subscribekey"
                      placeholder="Enter your Subscribe Key"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.subscribekey}
                    />{" "}
                     {formik.errors.subscribekey && formik.touched.subscribekey && (
          <span className="text-danger" >{formik.errors.subscribekey}</span>
        )}
                  </div>
                  </div>
                <div class="row justify-content-between text-left">
                  <div class="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <label class="form-control-label px-3">
                      Secret Key<span class="text-danger"> *</span>
                    </label>{" "}
                    <input
                      type="text"
                      name="secretkey"
                      placeholder="Enter your Secret Key"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.secretkey}
                    />{" "}
                     {formik.errors.secretkey && formik.touched.secretkey && (
          <span className="text-danger" >{formik.errors.secretkey}</span>
        )}
                  </div>
                  <div class="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <label class="form-control-label px-3">
                      <span class="text-danger"> </span>
                    </label>{" "}
                    <button
                      style={{ marginTop: "28px" }}
                      class="btn-block btn-primary"
                      type="submit"
                    >
                      Submit PubNub Keys
                    </button>{" "}
                  </div>
                </div>
                </form>
    </>
  );
}

export default PubNubForm;
