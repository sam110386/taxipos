import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { showIncomeModal } from "../../store/actions/GlobalActions";
import { PrequalifyIncomeModal } from "../../blocks/Modals";
import { ErrorDialog } from "../../blocks/Dialogs";
import { proveIncome } from "../../services/userServices";
import Loader from "../../blocks/Loader";

const Prequalify = ({ userLoggedIn, openIncomeModal }) => {
  const link_container_ref = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const checkProveIncome = async () => {
    try {
      setSubmitting(true);
      const res = await proveIncome();
      setSubmitting(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          if (link_container_ref.current) {
            const link = document.createElement("a");
            link.href = res.data.result.url;
            link.target = "_blank";
            link_container_ref.current.appendChild(link);
            link.click();
            link_container_ref.current.removeChild(link);
          }
          return;
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

  const onPrequalifyResult = (message) => {
    setErrorMessage(message);
    setIsError(true);
  };

  return (
    <div className="row">
      <div className="col-12">
        <p>
          Browse cars and prequalify to book by stating your income. By
          providing your income, you will save time at the dealership when you
          are ready to pickup the car.
        </p>
      </div>
      <div className="col-12">
        <div className="container py-5">
          <div className="row">
            <div className="col-6">
              <button className="btn" onClick={openIncomeModal}>
                Update Stated Income
              </button>
            </div>
            <div className="col-6">
              <button className="btn" onClick={checkProveIncome}>
                Prove Income
              </button>
            </div>
          </div>
        </div>
      </div>
      <PrequalifyIncomeModal onResult={onPrequalifyResult} />
      {isError && <ErrorDialog message={errorMessage} onClose={closeDialog} />}
      {submitting && <Loader />}
      <div ref={link_container_ref} />
    </div>
  );
};

const mapStateToPops = (state) => {
  const { userLoggedIn } = state.auth;
  return { userLoggedIn };
};

const mapDispatchToPops = (dispatch) => {
  return {
    openIncomeModal: () => dispatch(showIncomeModal()),
  };
};

export default connect(
  mapStateToPops,
  mapDispatchToPops
)(Prequalify);
