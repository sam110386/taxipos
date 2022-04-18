import React, { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Pagination from "../Pagination";
import {
  getActiveBookings,
  getPastBookings,
  getPendingBookings,
} from "../../services/userServices";
import Loader from "../Loader";

const BookingsList = ({ type }) => {
  const limit = 10;
  const [page, setPage] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Sorry, No Record Found.");
  const [records, setRecords] = useState(0);

  const loadBookings = async () => {
    if (page === 0) return;
    try {
      setLoading(true);
      let res = null;
      if (type === 1) res = await getPendingBookings({ page });
      if (type === 2) res = await getActiveBookings({ page });
      if (type === 3) res = await getPastBookings({ page, limit });

      setLoading(false);
      if (res && res.status === 200) {
        if (res.data && res.data.status) {
          setBookings(res.data.result);
          if (type === 3) {
            setRecords(res.data.records);
          }
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
    loadBookings();
  }, [page]);

  useMemo(() => {
    setBookings([]);
    if (page !== 1) setPage(1);
    else setPage(1);
  }, [type]);

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
                      {type === 1 ? (
                        <NavLink
                          className="border px-3 py-2 btn-warning"
                          to={`/account/pending-booking-detail/${el.id}`}
                        >
                          View details
                        </NavLink>
                      ) : (
                        <NavLink
                          className="border px-3 py-2 btn-warning"
                          to={`/account/booking-detail/${el.id}/${type}`}
                        >
                          View details
                        </NavLink>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bookings.length > 0 && (
            <>
              {type === 3 && (
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
            </>
          )}
        </div>
      )}

      {loading && <Loader />}
    </div>
  );
};

export default BookingsList;
