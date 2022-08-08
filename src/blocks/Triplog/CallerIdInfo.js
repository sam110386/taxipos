import React, { useEffect, useState } from "react";
import * as TriplogServices from "../../services/TriplogService";
import CallerIdDetails from "./CallerIdDetails";
import { FixedLoader } from "../Loaders";
import { string } from "yup";

const CallerIdInfo = () => {
  const [loading, setLoading] = useState(false);
  const [callerTripInfo, setCallerTripInfo] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [callerIdData, setCallerIdData] = useState({});
  // const [currentPhone,setCurrentPhone] = useState(null);
  let ar = [1, 2, 3, 4];

  const onError = () => {};

  const LoadCallorInfoTripLog = async () => {
    try {
      setLoading(true);
      const res = await TriplogServices.loadCallerInfoTriplog();
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          setCallerTripInfo(res.data.result.phone_data);
          setLoading(false);
        }
        onError(res.data.message);
      }
    } catch (err) {
      setLoading(false);
      onError();
    }
  };

  const ShowModal = async (phone, id) => {
    try {
      const res = await TriplogServices.openTripsTriplog({ id: id });
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          setCallerIdData(res.data.result);
        }
        onError(res.data.message);
      }
    } catch (err) {
      onError();
    }

    setShowDetails(true);
  };

  useEffect(() => {
    LoadCallorInfoTripLog();
    // setInterval(() => {
    LoadCallorInfoTripLog();
    // },30000)
  }, []);

  const openCallerIdDetail = () => {
    setShowDetails(true);
  };
  setTimeout(() => {}, 1000);
  return (
    <>
      {loading ? (
        <FixedLoader />
      ) : (
        <>
          <div id="latestCallerInfo">
            {ar.length > 0 &&
              ar.map((el, index, caller) => {
                if (index < 4) {
                  return (
                    <table className="blank_ul" key={index.toString()}>
                      {ar.map((el2, index2, arr) => {
                        if (index2 < 3) {
                          let f_numb;
                          if (index === 0) {
                            f_numb = index2 + 1;
                          } else if (index === 1) {
                            f_numb = index2 + 4;
                          } else if (index === 2) {
                            f_numb = index2 + 7;
                          } else {
                            f_numb = index2 + 10;
                          }
                          return (
                            <tbody key={index2.toString()}>
                              <tr className="inner_div">
                                <th className="mid_th comtab">F{f_numb}</th>
                                {callerTripInfo.map((ele3) => {
                                  if (ele3.UrlSend.Line == f_numb) {
                                    document.addEventListener(
                                      "keydown",
                                      onKeyDown,
                                      false
                                    );

                                    function onKeyDown(e) {
                                      var x = e.keyCode;
                                      var keyName = { F: 111 };
                                      if (x === keyName.F + f_numb) {
                                        ShowModal(
                                          ele3.UrlSend.Phone,
                                          ele3.UrlSend.id
                                        );
                                        e.preventDefault();
                                      }
                                    }
                                    return (
                                      <>
                                        <th
                                          className="mid_th text-center"
                                          width="100"
                                          onClick={() =>
                                            ShowModal(
                                              ele3.UrlSend.Phone,
                                              ele3.UrlSend.id
                                            )
                                          }
                                        >
                                          {ele3.UrlSend.Phone}
                                        </th>
                                        {/* <th className="mid_th"> ...  </th> */}
                                      </>
                                    );
                                  }
                                })}
                              </tr>
                            </tbody>
                          );
                        }
                      })}
                    </table>
                  );
                }
              })}
          </div>
          {showDetails && (
            <CallerIdDetails
              SetShowCallerId={setShowDetails}
              details={callerIdData}
            />
          )}
        </>
      )}
    </>
  );
};

export default CallerIdInfo;
