import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatsidebarDetails from "./ChatsidebarDetails";
// import Address_Picker from "../Pickers/AddressPicker";

const Chatsidebar = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [uniqueArray, setUniqueArray] = useState(null);
  const [urlSendId, setUrlSendId] = useState(null);

  const { callerid } = useSelector((state) => {
    return {
      callerid: state.callerid,
    };
  });

  useEffect(() => {
    var uniqueNumArray = [
      ...new Map(
        callerid.callerid.map((item) => [item["url_send_id"], item])
      ).values(),
    ];
    setUniqueArray(uniqueNumArray);
  }, [callerid]);

  const openModal = (url_send_id) => {
    setUrlSendId(url_send_id);
    setShowDetails(true);
  };

  return (
    <>
      <div className="mt-1 chatlogdiv">
        {uniqueArray &&
          uniqueArray.map((e, ind) => {
            return (
              <>
                <span id="chatlog" onClick={() => openModal(e.url_send_id)}>
                  {e.phone_no}
                </span>{" "}
                <br />
              </>
            );
          })}
      </div>
      {showDetails && (
        <ChatsidebarDetails
          SetShowCallerId={setShowDetails}
          urlSendId={urlSendId}
        />
      )}
    </>
  );
};

export default Chatsidebar;
