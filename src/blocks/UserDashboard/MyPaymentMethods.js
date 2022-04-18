import React, { useEffect, useState } from "react";
import {
  getMyPaymentMethods,
  setMyDefaultPaymentMethod,
} from "../../services/userServices";
import Loader from "../Loader";
import Switch from "@material-ui/core/Switch";
import { ErrorDialog } from "../Dialogs";

const PaymentMethodList = ({ setOfferDetail, needReload, onReloadDone }) => {
  //   const limit = 10;
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Loading Data ...");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");

  const loadPaymentMethods = async () => {
    if (page === 0) return;
    try {
      setLoading(true);
      const res = await getMyPaymentMethods({});
      setLoading(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          setResults(res.data.result);
        } else {
          setMessage(res.data.message);
        }
      } else {
        setMessage("Sorry, No Record Found.");
      }
    } catch (err) {
      setLoading(false);
      setMessage("Sorry, No Record Found.");
    }
  };

  const makeCardDefault = async (e, card_id) => {
    if (e.target.checked) {
      try {
        setLoading(true);
        const res = await setMyDefaultPaymentMethod({
          user_cc_token_id: card_id,
        });
        setLoading(false);
        if (res && res.status === 200) {
          if (res.data && res.data.status) {
            loadPaymentMethods();
          }
          setDialogMsg(res.data.message);
          setShowDialog(true);
          return;
        }
        setDialogMsg("");
        setShowDialog(true);
      } catch (err) {
        setLoading(false);
        setDialogMsg("");
        setShowDialog(true);
      }
    }
  };

  const clearErrors = () => {
    setDialogMsg("");
    setShowDialog(false);
  };
  useEffect(() => {
    if (needReload) {
      loadPaymentMethods();
      onReloadDone();
    }
  }, [page, needReload]);

  return (
    <div className="container" style={{ minHeight: 200 }}>
      <div className="row">
        {results &&
          results.map((el, i) => (
            <div className="col-12 col-lg-5 col-md-6" key={el.id}>
              <div className="card ">
                <h5 className="card-header text-center bg-white">
                  Card Details
                </h5>
                <div className="card-body">
                  <p className="card-text">
                    Card Number: ***********{el.credit_card_number}
                  </p>
                  <p className="card-text">Card Expiry: {el.expiration}</p>
                </div>
                <div className="card-footer text-right py-0">
                  <Switch
                    checked={el.is_default === 1 ? true : false}
                    color="primary"
                    onChange={(e) => makeCardDefault(e, el.id)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      {showDialog && <ErrorDialog message={dialogMsg} onClose={clearErrors} />}
      {loading && <Loader />}
    </div>
  );
};

export default PaymentMethodList;
