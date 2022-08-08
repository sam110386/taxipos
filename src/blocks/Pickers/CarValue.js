import React, { useEffect, useState } from "react";
const CarValue = ({
  carName,
  rel_affiliate_dispache,
  rel_parent_dispacher,
  rel_current_dispacher,
}) => {
  const [car_Name, setCarName] = useState(carName);
  const [toogle, setToogle] = useState(false);
  const handleChnage = (event) => {
    setCarName(event.target.value);
  };
// true && true || false
  return (
    <>
      {rel_current_dispacher === rel_parent_dispacher ||
      rel_current_dispacher === rel_affiliate_dispache ? (
        toogle ? (
          <input value={car_Name} onChange={handleChnage} />
        ) : (
          <span onClick={() => setToogle(true)}>{car_Name}</span>
        )
      ) : (
        <span>{car_Name}</span>
      )}
    </>
  );
};
export default CarValue;
