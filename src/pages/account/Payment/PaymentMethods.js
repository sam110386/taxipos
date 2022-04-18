import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ErrorDialog } from "../../../blocks/Dialogs";
import { CreditCardModal } from "../../../blocks/Modals";
import PaymentMethodList from "../../../blocks/UserDashboard/MyPaymentMethods";
import { showCreditCardModal } from "../../../store/actions/GlobalActions";
import { removeOfferDetail } from "../../../store/actions/UserAction";

const PaymentMethods = ({ clearOfferData, openCreditCardModal }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [needReload, setNeedReload] = useState(true);

  useEffect(() => {
    clearOfferData();
  }, []);

  const onPrequalifyResult = (message) => {
    setDialogMsg(message);
    setShowDialog(true);
  };

  const clearErrors = () => {
    setDialogMsg("");
    setShowDialog(false);
    reloadData();
  };

  const reloadData = () => {
    setNeedReload(true);
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-8 mb-2">
          <h2>Payment Methods</h2>
        </div>
        <div className="col-12 col-md-4 mb-2">
          <button className="btn w-100" onClick={openCreditCardModal}>
            Add Credit Card
          </button>
        </div>
        <div className="col-12">
          <hr />
        </div>
        <div className="col-12">
          <PaymentMethodList
            needReload={needReload}
            onReloadDone={() => setNeedReload(false)}
          />
        </div>
      </div>
      <CreditCardModal onResult={onPrequalifyResult} />
      {showDialog && <ErrorDialog message={dialogMsg} onClose={clearErrors} />}
    </div>
  );
};

const mapDispatchToPops = (dispatch) => {
  return {
    clearOfferData: () => dispatch(removeOfferDetail()),
    openCreditCardModal: () => dispatch(showCreditCardModal()),
  };
};

export default connect(null, mapDispatchToPops)(PaymentMethods);
