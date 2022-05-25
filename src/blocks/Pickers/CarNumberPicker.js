import { useSelector } from "react-redux";
import * as React  from 'react';
import  {useEffect} from 'react'
export const CarNumberPicker = ({ field, form, id,getDeviceId, ...props }) => {
    const {name,value} = field;
    const { userDetails } = useSelector((state) => {
        return { userDetails: state.auth.userDetails }
    });

    return <select name={name} id={id} {...field} {...props} >
        {userDetails.FleetDevices && userDetails.FleetDevices.map((el,ind) => (
            <option key={ind.toString()} value={`label:${el.label} , value:${el.value}`}>{el.label}</option>
        ))}
        </select>
}