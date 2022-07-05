import React, { useEffect, useState } from "react";
const CarValue = (props) => {
  const [carName, setCarName] = useState(props.carName);
  const [toogle, setToogle] = useState(false);
  const handleChnage = (event) => {
    setCarName(event.target.value);
  };
  return (
    <>
    {toogle?   <input value={carName} onChange={handleChnage} />:
    <span onClick={() => setToogle(true)}>{carName}</span>
    }
    </>
  );
};
export default CarValue;
