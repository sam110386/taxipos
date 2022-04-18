import React from "react";
import { connect } from "react-redux";
import {
  removeCarQuoteError,
  getCarQuote,
  setRentTownCar,
} from "../../store/actions/CarAction";

const VehicleQuoteErrorDialog = ({
  rentTownCar,
  carQuoteError,
  clearCarQuoteError,
  reloadCarQuotes,
  saveRentTownData,
}) => {
  const goBack = () => {
    clearCarQuoteError();
    window.history.back();
  };

  const reloadData = () => {
    clearCarQuoteError();
    const data = { ...rentTownCar };
    data["startdatetime"] = carQuoteError.result.start_datetime;
    saveRentTownData(data);
  };

  if (!carQuoteError) return null;

  return (
    <div className="dialog-wrapper">
      <div className="align-items-center bg-dark justify-content-center  dialog-container ">
        <div className="dialog-body">
          <div className="logo">
            <img src="/images/logo.png" alt="" />
          </div>
          <div>
            <p className="text-white">{carQuoteError.message}</p>
          </div>
        </div>
        <div className="footer ">
          {carQuoteError.result &&
          Object.keys(carQuoteError.result).length > 0 ? (
            <>
              <button className="btn mr-3" onClick={reloadData}>
                Yes
              </button>
              <button className="btn" onClick={goBack}>
                No
              </button>
            </>
          ) : (
            <button className="btn" onClick={goBack}>
              ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToPops = (state) => {
  const { carQuoteError, rentTownCar } = state.cars;
  return { carQuoteError, rentTownCar };
};
//clearCarQuoteError

const mapDispatchToPops = (dispatch) => {
  return {
    reloadCarQuotes: (data) => dispatch(getCarQuote(data)),
    clearCarQuoteError: () => dispatch(removeCarQuoteError()),
    saveRentTownData: (data) => dispatch(setRentTownCar(data)),
  };
};

export default connect(
  mapStateToPops,
  mapDispatchToPops
)(VehicleQuoteErrorDialog);
