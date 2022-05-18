import { useSelector } from "react-redux";
import * as React  from 'react';
import  {useEffect} from 'react'
export const CarNumberPicker = ({ field, form, id,getDeviceId, ...props }) => {
    const {name,value} = field;
    console.log("value",value,name)
    const { userDetails } = useSelector((state) => {
        return { userDetails: state.auth.userDetails }
    });

    return <select name={name} id={id} {...field} {...props} >
        {userDetails.FleetDevices && userDetails.FleetDevices.map(el => (
            <option value={`label:${el.label} , value:${el.value}`}>{el.label}</option>
        ))}
        </select>
}