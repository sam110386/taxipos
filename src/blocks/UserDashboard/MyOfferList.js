import React, { useEffect, useState } from "react";
import moment from "moment";
import { getMyOffers } from "../../services/userServices";
import Loader from "../Loader";
import { Button } from "@material-ui/core";
import { saveOfferDetail } from "../../store/actions/UserAction";
import { connect } from "react-redux";

const MyOffersList = ({ setOfferDetail }) => {
  const page = 1;
  const [bookings, setMyOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Loading Data ...");

  const loadMyOffers = async () => {
    if (page === 0) return;
    try {
      setLoading(true);
      const res = await getMyOffers({ page });
      setLoading(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          setMyOffers(res.data.result);
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

  const showOfferDetail = (data) => {
    setOfferDetail(data);
    window.location.href = `/account/myoffers/${data.id}/`;
  };

  useEffect(() => {
    loadMyOffers();
  }, [page]);

  return (
    <div className="container" style={{ minHeight: 200 }}>
      {(!bookings || bookings.length <= 0) && !loading && (
        <div className="d-flex justify-content-center" />
      )}
      {bookings && (
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              {bookings.length <= 0 && (
                <caption>
                  <div className="d-flex justify-content-center">
                    <label className="text-capitalize">{message}</label>
                  </div>
                </caption>
              )}
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Vehicle</th>
                  <th scope="col" className="text-center">
                    Scheduled Start Time
                  </th>
                  <th scope="col" className="text-center">
                    Scheduled End Time
                  </th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((el, i) => (
                  <tr key={el.id + i}>
                    <th scope="row">{i + 1}</th>
                    <td>{el.year + " " + el.make + " " + el.model}</td>
                    <td className="text-center">
                      {moment(el.start_datetime).format("h:mm a - Do MMMM")}
                    </td>
                    <td className="text-center">
                      {moment(el.end_datetime).format("h:mm a - Do MMMM")}
                    </td>
                    <td className="text-center">
                      <Button
                        className="border px-3 py-2 btn-warning"
                        onClick={() => showOfferDetail(el)}
                        to={``}
                      >
                        View details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {loading && <Loader />}
    </div>
  );
};

const mapDispatchToPops = (dispatch) => {
  return {
    setOfferDetail: (data) => dispatch(saveOfferDetail(data)),
  };
};
export default connect(null, mapDispatchToPops)(MyOffersList);
