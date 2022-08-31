import React from "react";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useState, useEffect } from "react";
import { telephoneverifyication } from "../../../services/TriplogService";


function TelephoneVerfiy({ getTelenum,setShowCallerId,setCalleriddetail,reset }) {
  const [num, setNum] = useState("");
  const [data, setData] = useState({});
  const [toogle, setToogle] = useState(false);
  const [detail, setDetail] = useState({
    phone_no: "",
  });

  const VerifyTelePhone = async () => {
    const data = { telephone: `${num}` };
    try {
      const res = await telephoneverifyication(data);
      setNum("");
      console.log(res);
      if (res && res.status === 200) {
        if (res.data && res.data.status === 1) {
          setCalleriddetail({ ...detail, phone_no: res.data.result.phone_no });
          setShowCallerId(true);
          setData(res.data.result);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
useEffect(() =>{
if(reset){
  setNum("")

} else if(!reset){
getTelenum(num)

}
},[num,reset])
  return (
    <span className="relative">
      <input
        name="telephone"
        placeholder="Telephone"
        className="form-control"
        autoComplete="off"
        value={num}
        onChange={(e) => {
          setNum(e.target.value);
        }}
      />
      <span
        onClick={VerifyTelePhone}
        style={{
          paddingTop: "10px",
          paddingRight: "10px",
          float: "Right",
          display: "block",
          marginTop: "-47px",
          cursor:"pointer"
        }}
      >
        <ManageSearchIcon />
      </span>
    </span>
  );
}

export default TelephoneVerfiy;
