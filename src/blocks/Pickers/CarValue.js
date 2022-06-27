import React, { useEffect, useState } from "react";
const CarValue = (props) => {
    const [carName, setCarName] = useState(props.carName)
    const handleChnage = (event) => {
        setCarName(event.target.value);
    }
    return (
        <input value={carName} onChange={handleChnage}></input>
    )

}
export default CarValue;