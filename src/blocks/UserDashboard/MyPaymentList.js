import React, { useEffect, useState } from "react";
import { getMyTransactions } from "../../services/userServices";
import Loader from "../Loader";
import Pagination from "../Pagination";
import PaymentDetailModal from "../Modals/PaymentDetailModal";

const MyPaymentList = ({ setOfferDetail }) => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [bookings, setMyOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Loading Data ...");
  const [records, setRecords] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);

  const loadPaymentDetails = async () => {
    if (page === 0) return;
    try {
      setLoading(true);
      const res = await getMyTransactions({ page, limit });
      setLoading(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          setMyOffers(res.data.result);
          setRecords(res.data.total);
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

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    loadPaymentDetails();
  }, [page]);

  const getCovering = (el) => {
    try {
      const start_date_splits = String(el.Booking.start_datetime).split(" ");
      const end_date_splits = String(el.Booking.end_datetime).split(" ");
      if (start_date_splits.length > 0 && end_date_splits.length > 0) {
        const s_splits = start_date_splits[0].split("-");
        const e_splits = end_date_splits[0].split("-");
        return `${s_splits[1]}/${s_splits[2]}-${e_splits[1]}/${e_splits[2]}`;
      }
    } catch (err) {
      return "N/A";
    }
  };

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
                  <th scope="col">Transaction Date</th>
                  <th scope="col" className="text-center">
                    Transaction Type
                  </th>
                  <th scope="col" className="text-center">
                    Order No.
                  </th>
                  <th scope="col" className="text-center">
                    Covering
                  </th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((el, i) => (
                  <tr key={el.cs_order_id + i}>
                    <th scope="row">{(page - 1) * 10 + (i + 1)}</th>
                    <td>{el.created}</td>
                    <td className="text-center">{el.title}</td>
                    <td className="text-center">{el.increment_id}</td>
                    <td className="text-center">{getCovering(el)}</td>
                    <td className="text-center">
                      <button
                        className="btn-small btn-pink px-3 py-1"
                        onClick={() => setCurrentItem(el)}
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bookings.length > 0 && (
            <div className="d-flex justify-content-end w-100 mr-3">
              <Pagination
                records={records}
                limit={limit}
                pages={Math.ceil(records / limit)}
                currentPage={page}
                updatePagination={(new_page) => setPage(new_page)}
              />
            </div>
          )}
        </div>
      )}

      {loading && <Loader />}
      <PaymentDetailModal
        item={currentItem}
        handleClose={() => setCurrentItem(null)}
      />
    </div>
  );
};

export default MyPaymentList;
