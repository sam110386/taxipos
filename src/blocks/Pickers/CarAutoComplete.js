import React, { useState } from "react";
import * as CarService from "../../services/CarService"

const CarAutoComplete = (props) => {

    const [selectedOpt, setSelectedOpt] = useState(props.carName?props.carName:'Car #')

    let trip = props.trip
    let dispacherId = props.dispacherId;

    const Autocomplete = async (e) => {
        var id = e.currentTarget.id;
        var value = e.target.value;
        let opt;
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13 && value != "") {
            var term = value;
            // var callType = e.target.getAttribute('rel-call_type')
            var currentDispacher = e.target.getAttribute('rel-current-dispacher')
            var loggedInDispacher = dispacherId;
            var ParentDispacher = e.target.getAttribute('rel-parent-dispacher')
            /**New Route Assign method Start here**/
            if (term === "r" || term === "R") {
                const res = await CarService.reassignCar({ id: id, currentDispacher: currentDispacher, ParentDispacher: ParentDispacher })
                return false;
            }
            /**Route Assign method end here**/
            if ((loggedInDispacher === currentDispacher && currentDispacher != ParentDispacher) || (loggedInDispacher === ParentDispacher)) {
                if (term === "a" || term === "A") {
                    return false;
                }
                //validate to CHILD dispacher to dispatch the NET type trip again as NET
                if (term === "N" || term === "n") {
                    alert("Sorry, you don't have permission for this action.");
                    opt = "'Send To NET'"
                    // setSelectedOpt("'Send To NET'");
                    return false;
                }

                let res = await CarService.autoCompleteCar({ term });
                console.log("HERE")
                if (res && res.status === 200) {
                    let car_no = res.data.result.value;
                    let device_id = res.data.result.id;
                    let call_type_line = res.data.result.call_type_line;
                    let status = res.data.result.status;
                    // sendInfoToAffiliatetriplogFlag=true;
                   props.sendInfoToAffiliatetriplog(car_no, device_id, id, status, call_type_line);
                }

            } else {
                let res = await CarService.autoCompleteCar({ term });
                if (res && res.status === 200) {
                    let car_no = res.data.result.value;
                    let device_id = res.data.result.id;
                    let call_type_line = res.data.result.call_type_line;
                    let status = res.data.result.status;
                    // sendInfoToAffiliatetriplogFlag=true;
                    // sendInfoToCar_triplog(car_no, device_id, id, status, call_type_line);

                }
            }
        }
        else {
            if (value === "c" || value === "C") {
                opt="Car #"
                // setSelectedOpt("Car #")
            }
            if (value === "s" || value === "S") {
                opt="Send To All"
                // setSelectedOpt("Send To All")
            }
            if (value === "l" || value === "L") {
                opt="Line"
                // setSelectedOpt("Line")
            }
            if (value === "n" || value === "N") {
                opt="Sent To NET"
                // setSelectedOpt("Send To NET")
            }
            if (value === "d" || value === "D") {
                opt = "Auto-Dispatch"
                // setSelectedOpt("Auto-Dispatch")
            }
        }
        
        setSelectedOpt(opt)
    }

    const handleChnage = (event) => {
        setSelectedOpt(event.target.value);
    }
    return (<input type="text" onChange={handleChnage} value={selectedOpt} onFocus={(e) => e.target.value = ""} onKeyUp={Autocomplete} name={trip['Triplog']['id']} id={trip['Triplog']['id']} rel-affiliate-dispacher={trip['Triplog']['affiliate_accept']} rel-parent-dispacher={trip['Triplog']['parent_dispacher_id']} rel-current-dispacher={dispacherId} rel-call_type={trip['Triplog']['call_type']} className="textfield carAutoComplete" />)
}
export default CarAutoComplete;