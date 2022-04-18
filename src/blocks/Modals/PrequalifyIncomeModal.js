import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { hideIncomeModal } from "../../store/actions/GlobalActions";
import { saveUserIncome } from "../../services/userServices";
import { loadUserDetail } from "../../store/actions/UserAction";
import Loader from "../Loader";

const incomeSchema = Yup.object().shape({
  income: Yup.string().required("Please enter your income"),
});

const PrequalifyIncomeModal = ({
  showIncomeModal,
  closeIncomeModal,
  onResult,
  refreshUserDetail
}) => {
  const [submitting, setSubmitting] = useState(false);

  const onResponse = (message) => {
    onResult(message);
    closeModal();
  };

  const closeModal = () => {
    closeIncomeModal();
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const res = await saveUserIncome({ income: values.income });
      setSubmitting(false);
      if (res && res.status === 200) {
        //reload User Data
        refreshUserDetail();
        onResponse(res.data.message);
        return;
      }
      onResponse("Sorry! something went wrong.Please reload your page.");
    } catch (err) {
      setSubmitting(false);
      onResponse("Sorry! something went wrong.Please reload your page.");
    }
  };

  if (!showIncomeModal) return null;

  return (
    <div className="dialog-wrapper">
      <div className="align-items-center justify-content-center  dialog-container position-relative">
        {submitting && <Loader />}
        <Formik
          initialValues={{
            income: "",
          }}
          validationSchema={incomeSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched, submitForm, values }) => (
            <>
              <div className="dialog-body">
                <div className="logo">
                  <img src="/images/logo.png" alt="" />
                </div>
                <div className="d-block">
                  <div className="row position-relative">
                    <div className="col-12">
                      <label className="form_lbl">Income</label>
                      <Field
                        name="income"
                        type="number"
                        className="form-control"
                        placeholder=""
                      />
                      {errors.income && touched.income && (
                        <div className="d-block invalid-feedback ml-1">
                          {errors.income}
                        </div>
                      )}
                    </div>
                  </div>
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
  const { showIncomeModal } = state.global;
  return { showIncomeModal };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeIncomeModal: () => dispatch(hideIncomeModal()),
    refreshUserDetail:() => dispatch(loadUserDetail())
  };
};
export default connect(
  mapStateToPops,
  mapDispatchToProps
)(PrequalifyIncomeModal);
