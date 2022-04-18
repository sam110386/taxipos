import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { hideCreditCardModal } from "../../store/actions/GlobalActions";
import { loadUserDetail } from "../../store/actions/UserAction";
import { saveUserCard } from "../../services/userServices";
import Loader from "../Loader";
import Cards from "react-credit-cards";

import "react-credit-cards/es/styles-compiled.css";
import { MaskedInput } from "../Form";

const creditCardSchema = Yup.object().shape({
  credit_card_number: Yup.string().required("Please enter your card number"),
  name: Yup.string().required("Please enter your name"),
  expiration: Yup.string().required("Please enter your expiration date"),
  cvv: Yup.string().required("Please enter your CVC"),
  address: Yup.string().required("Please enter your street address"),
  city: Yup.string().required("Please enter city"),
  state: Yup.string().required("Please enter state"),
  zip: Yup.string().required("Please enter postal code"),
});

const CreditCardModal = ({
  showCreditCardModal,
  closeCreditCardModal,
  onResult,
  refreshUserDetail,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onResponse = (message) => {
    onResult(message);
    closeModal();
  };

  const closeModal = () => {
    closeCreditCardModal();
  };

  const handleSubmit = async (values) => {
    setErrorMsg("");
    try {
      setSubmitting(true);
      const res = await saveUserCard(values);
      setSubmitting(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          refreshUserDetail();
          onResponse(res.data.message);
          return;
        } else {
          setErrorMsg(res.data.message);
          return;
        }
      }
      onResponse("Sorry! something went wrong.Please reload your page.");
    } catch (err) {
      setSubmitting(false);
      onResponse("Sorry! something went wrong.Please reload your page.");
    }
  };

  if (!showCreditCardModal) return null;

  return (
    <div className="dialog-wrapper">
      <div className="align-items-center justify-content-center credit-card-dialog-container position-relative">
        {submitting && <Loader />}
        <Formik
          initialValues={{
            credit_card_number: "",
            name: "",
            expiration: "",
            cvv: "",
            address: "",
            city: "",
            state: "",
            zip: "",
          }}
          validationSchema={creditCardSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched, submitForm, values, setFieldValue }) => (
            <>
              <div className="dialog-body">
                <div className="logo">
                  <img src="/images/logo.png" alt="" />
                </div>
                <hr className="w-100" />
                <div className="d-block pt-4">
                  <div className="row position-relative">
                    <div className="form-group col-lg-6 col-12 d-flex align-items-center">
                      <Cards
                        cvc={values.cvv}
                        expiry={values.expiration}
                        focused="true"
                        name={values.name}
                        number={values.credit_card_number}
                      />
                    </div>
                    <div className="form-group col-lg-6 col-12">
                      <div className="row">
                        <div className="col-12 mb-2">
                          <MaskedInput
                            name="credit_card_number"
                            value={values.credit_card_number}
                            onChange={(e) =>
                              setFieldValue(
                                "credit_card_number",
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            className="form-control"
                            type="text"
                            pattern="[\d| ]{16,22}"
                            mask="9999 9999 9999 9999"
                            maskChar=" "
                            placeholder="Card Number"
                          />
                          {errors.credit_card_number &&
                            touched.credit_card_number && (
                              <div className="d-block invalid-feedback ml-1">
                                {errors.credit_card_number}
                              </div>
                            )}
                        </div>

                        <div className="col-12 mb-2">
                          <Field
                            name="name"
                            component="input"
                            className="form-control"
                            type="text"
                            placeholder="Name"
                          />
                          {errors.name && touched.name && (
                            <div className="d-block invalid-feedback ml-1">
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div className="col-12 mb-2 mb-2">
                          <MaskedInput
                            name="expiration"
                            className="form-control"
                            type="text"
                            pattern="\d\d/\d\d"
                            placeholder="MM/YY"
                            value={values.expiration}
                            onChange={(e) =>
                              setFieldValue("expiration", e.target.value)
                            }
                            mask="99/99"
                            maskChar="_"
                          />
                          {errors.expiration && touched.expiration && (
                            <div className="d-block invalid-feedback ml-1">
                              {errors.expiration}
                            </div>
                          )}
                        </div>
                        <div className="col-12 mb-2">
                          <Field
                            name="cvv"
                            component="input"
                            className="form-control"
                            type="text"
                            pattern="\d{3,4}"
                            placeholder="CVC"
                            maxLength="4"
                          />
                          {errors.cvv && touched.cvv && (
                            <div className="d-block invalid-feedback ml-1">
                              {errors.cvv}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-12">
                      <hr />
                      <div className="row">
                        <div className="col-md-12 form-group col-lg-6 mb-2">
                          <Field
                            name="address"
                            component="input"
                            className="form-control"
                            type="text"
                            placeholder="Street address"
                          />
                          {errors.address && touched.address && (
                            <div className="d-block invalid-feedback ml-1">
                              {errors.address}
                            </div>
                          )}
                        </div>
                        <div className="col-md-12 col-lg-6 mb-2">
                          <Field
                            name="city"
                            component="input"
                            className="form-control"
                            type="text"
                            placeholder="City"
                          />
                          {errors.city && touched.city && (
                            <div className="d-block invalid-feedback ml-1">
                              {errors.city}
                            </div>
                          )}
                        </div>
                        <div className="col-md-12 col-lg-6 mb-2">
                          <Field
                            name="state"
                            component="input"
                            className="form-control"
                            type="text"
                            placeholder="State"
                          />
                          {errors.state && touched.state && (
                            <div className="d-block invalid-feedback ml-1">
                              {errors.state}
                            </div>
                          )}
                        </div>
                        <div className="col-md-12 col-lg-6">
                          <Field
                            name="zip"
                            component="input"
                            className="form-control"
                            type="text"
                            placeholder="Postal Code"
                          />
                          {errors.zip && touched.zip && (
                            <div className="d-block invalid-feedback ml-1">
                              {errors.zip}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {errorMsg && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger" role="alert">
                          {errorMsg}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="footer ">
                <button className="btn" onClick={closeModal}>
                  cancel
                </button>
                <button type="submit" className="btn" onClick={submitForm}>
                  Save
                </button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToPops = (state) => {
  const { showCreditCardModal } = state.global;
  return { showCreditCardModal };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeCreditCardModal: () => dispatch(hideCreditCardModal()),
    refreshUserDetail: () => dispatch(loadUserDetail()),
  };
};
export default connect(mapStateToPops, mapDispatchToProps)(CreditCardModal);
