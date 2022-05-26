import React, { useEffect, useState } from "react";
const CarValue = (props) => {
    const [carName, setCarName] = useState(props.carName)
    return (
            {carName}
    )

}
export default CarValue;