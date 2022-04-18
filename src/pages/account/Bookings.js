import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { BookingsList } from "../../blocks/UserDashboard";

const Bookings = (props) => {
  const { type } = props.match.params;
  const [activeTab, setActivetab] = useState(parseInt(type) || 1);

  useEffect(() => {
    if (!type) {
      setActivetab(1);
    }
  }, []);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <ul className="nav nav-pills">
              <li className="nav-item  mr-3">
                <a
                  className={`nav-link border ${
                    activeTab === 1 ? "active-tab" : "text-black"
                  } `}
                  href="/account/bookings/1"
                >
                  Pending
                </a>
              </li>
              <li className="nav-item mr-3">
                <a
                  className={`nav-link border ${
                    activeTab === 2 ? "active-tab" : "text-black"
                  } `}
                  href="/account/bookings/2"
                >
                  Active
                </a>
              </li>
              <li className="nav-item  mr-3">
                <a
                  className={`nav-link border ${
                    activeTab === 3 ? "active-tab" : "text-black"
                  } `}
                  href="/account/bookings/3"
                >
                  Past
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12">
          <hr />
        </div>
        <div className="col-12">
          <BookingsList type={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Bookings);
