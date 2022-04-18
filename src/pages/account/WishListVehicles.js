import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../blocks/Pagination";
import MetaTagsInfo from "../../blocks/MetaTagsInfo";
import {
  getWishListVehicles,
  removeWishListVehicle,
} from "../../services/userServices";
import Loader from "../../blocks/Loader";
import ListingCarFilters from "../../blocks/ListingCarFilters";
import { ErrorDialog } from "../../blocks/Dialogs";
var Constants = require("../../config/Constants");

const WishListVehicles = () => {
  const [limit, setLimit] = useState(8);
  const [cars, setCars] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [search_records, setSearchRecords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const getCars = async () => {
    // Get Cars
    setLoading(true);
    const response = await getWishListVehicles({ page: pagination,limit:limit });
    setLoading(false);
    if (response.data && response.data.status) {
      setCars(response.data.result);
      setSearchRecords(response.data.records || 8);
    } else {
      setMessage(response.data.message);
      setSearchRecords(null);
      setCars([]);
    }
  };

  const featuredText = (featured_text) => {
    return featured_text.map((ob, index) => {
      return <li key={"fet=" + index}>{ob}</li>;
    });
  };
  const formatPrice = (price) => {
    return Constants.PREFIX_CURRENCY_SYMBLE + price; //new Intl.NumberFormat('en-US', { syle: 'decimal'})
  };

  const getUrl = (page) => {
    var url = window.location.href.split("/");
    var lastParam = url[url.length - 1];
    var params = "";
    if (lastParam.indexOf("=") > -1) {
      url.splice(url.length - 1, 1);
      if (lastParam.indexOf("page") > -1) {
        var arr = lastParam.split("&");
        params = window.location.href.replace(
          arr[arr.length - 1],
          "page=" + page
        );
      } else {
        params = window.location.href + "&page=" + page;
      }
    } else {
      params = window.location.href + "/page=" + page;
    }
    return params;
  };

  const updatePagination = (pagination) => {
    var params = getUrl(pagination);
    window.history.pushState({ urlPath: params }, document.title, params);
    setCars(null);
    setPagination(pagination);
    if(pagination===1){
      getCars();
    }
    window.scrollTo(0, 150);
  };

  const renderPagination = () => {
    //if (pagination < 2) return null;
    return (
      <Pagination
        records={search_records}
        limit={limit}
        pages={Math.ceil(search_records / limit)}
        currentPage={pagination}
        updatePagination={updatePagination}
      />
    );
  };
  const updateFilter = (event) => {
    setCars(null);
    setLimit(event.target.value);
    setPagination(1);
    if(pagination===1){
      getCars();
    }
  };
  const removeVehicleFromWishList = async (vehicle_id) => {
    setLoading(true);
    const res = await removeWishListVehicle({ vehicle_id });
    setLoading(false);
    if (res && res.status === 200) {
      setShowDialog(true);
      setMessage(res.data.message);
      if (res.data && res.data.status) {
        getCars();
      }
    }
  };

  useEffect(() => {
    getCars();
  }, [pagination]);

  return (
    <div>
      <div className="p-2 text-center bg-light"><h1 className="m-3">My Wishlist</h1></div>
      <section className="search_sec">
        <MetaTagsInfo
          pageTitle="DriveItAway"
          action="getPageMetas"
          id={Constants.WISHLIST_PAGE_ID}
        />
        
        <div className="container">
        <div className="sort_box">
              <ListingCarFilters
                search_records={search_records}
                updateFilter={updateFilter}
                pages={pagination}
                currentPage={pagination}
                updatePagination={updatePagination}
                filters={""}
              />
            </div>
          <div className="car_sec">
            <div className="row">
              {cars
                ? cars.map((obj, index) => (
                    <div key={"car-" + index} className="col-sm-6 col-lg-3">
                      <div className="car_box">
                        <div className="car_img text-center position-relative">
                          <Link
                            to={
                              "/car/details/" +
                              obj.id +
                              "/" +
                              obj.vehicle_name
                                .split(" ")
                                .join("-")
                                .toLowerCase()
                            }
                          >
                            <img src={obj.image} alt="" />
                          </Link>
                          <button
                            className="page-link heart position-absolute d-flex align-items-center justify-content-center active"
                            title="dislike"
                            onClick={() => removeVehicleFromWishList(obj.id)}
                          >
                            <i className="fa fa-heart" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="car_list">
                          <span>
                            {obj.model} {obj.year}
                          </span>
                          <span>
                            <img src="/images/miles.png" alt="" />{" "}
                            {obj.odometer} Miles
                          </span>
                          <h4>{obj.make}</h4>
                          <ul className="list-unstyled">
                            {featuredText(obj.featured_text)}
                          </ul>
                          <br />
                        </div>
                        <div className="car_price d-flex justify-content-between">
                          <div>
                            <h5>{obj.rent}</h5>
                            <span>{obj.rent_label}</span>
                          </div>
                          <div>
                            <Link
                              className="btn"
                              to={
                                "/car/details/" +
                                obj.id +
                                "/" +
                                obj.vehicle_name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()
                              }
                            >
                              {formatPrice(obj.msrp)}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : !loading && <h3 className="text-center">{message}</h3>}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="page_next">{renderPagination()}</div>
        </div>
        {loading && <Loader />}
        {showDialog && (
          <ErrorDialog message={message} onClose={() => setShowDialog(false)} />
        )}
      </section>
    </div>
  );
};

export default WishListVehicles;
