import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as CarService from "../../services/CarService"


const CarAutoComplete = (props) => {

    const [selectedOpt, setSelectedOpt] = useState('Car #')
    const [UnacceptedCarValue, setUnacceptedCarValue] = useState('')
    const [carValue, setCarValue] = useState('');

    let trip = props.trip
    let dispacherId = props.dispacherId;
    let back_class = props.back_class;

    const reloadTripDetails = async(id,type) =>{
        let res = await CarService.reloadTripDetails(id)
        // console.log("reload trip details",res)
    }


    let sendInfoToAffiliatetriplog = async (car_no, device_id, id, status, call_type_line) => {
        // if(!sendInfoToAffiliatetriplogFlag){
        //     return;
        // }
        var call_type = '';
        if (status == "deactivated") {
            alert("Car # " + car_no + " is Deactivated. Speak to Management.");
            return false;
        }
        if (status == "not_found") {
            alert("Car # " + car_no + " does not exist.");
            return false;
        }
        if (status == "not_booked") {
            alert("Car # " + car_no + " is not booked in.");
            return false;
        }
        if (status == "no_lined_device") {
            alert("No lined device found.");
            return false;
        } else if (status == "lined_device") {
            call_type = call_type_line;
        }
        if (status == "net_activated") {
            call_type = 'NET';
        }
        var params = { id, device_id, car_no, call_type }
        let res = await CarService.reassignAffiliate(params)
        if (res && res.status === 200) {
            if (res.data && res.data.status === 1) {
                reloadTripDetails(id,"update")

                //sendInfoToAffiliatetriplogFlag=false;//will avaoid the call to resend
            }
        }
    

        // window.$("#" + id + "").removeClass('focused');
        // window.$("#" + id + "").blur();
        // window.$.ajax({
        //     // url: SITE_URL+"affiliate_partners/reassign_affiliate_dispatch",
        //     type: "post",
        //     data: params,
        //     async: false,
        //     success: function(data) {
        //         grabTripDetails(id,'Edit');
        //         sendInfoToAffiliatetriplogFlag=false;//will avaoid the call to resend
        //     }
        // });
    }

    let sendInfoToCar_triplog = async(car_no, device_id, id, status, call_type_line)=> {

        var call_type = '';
        if (status == "deactivated") {
            setSelectedOpt('')
            // $("#" + id + "").focus();
            alert("Car # " + car_no + " is Deactivated. Speak to Management.");
            return false;
        }
        if (status == "not_found") {
            setSelectedOpt('')
            // $("#" + id + "").focus();
            alert("Car # " + car_no + " does not exist.");
            return false;
        }
        if (status == "not_booked") {
            setSelectedOpt('')
            // $("#" + id + "").focus();
            alert("Car # " + car_no + " is not booked in.");
            return false;
        }
        if (status == "no_lined_device") {
            setSelectedOpt('')
            // $("#" + id + "").focus();
            alert("No lined device found.");
            return false;
        } else if (status == "lined_device") {
            setSelectedOpt('')
            call_type = call_type_line;
        }
        if (status == "net_activated") {
            setSelectedOpt('')
            // $("#" + id + "").focus();
            call_type = 'NET';

        }
        if (status == "auto_activated") {
            setSelectedOpt('')
            // $("#" + id + "").focus();
            call_type = '';

        }

        var params = { id, device_id, car_no,call_type }
        // $("#" + id + "").removeClass('focused');
        // $("#" + id + "").blur();
        let res = await CarService.carAssignment(params)
        // console.log(res,"myres")
        // $.ajax({
        //     url: SITE_URL + "dispachers/send_push_notification_direct",
        //     type: "post",
        //     data: params,
        //     async: false,
        //     success: function (data) {

        //     }
        // });
    }


    const Autocomplete = async (e) => {
        var id = e.currentTarget.id;
        var value = e.target.value;
        // alert("me too listioning");
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13 && value != "") {
            var term = value;
            var callType = e.target.getAttribute('rel-call_type')
            var currentDispacher = e.target.getAttribute('rel-current-dispacher')
            var loggedInDispacher = dispacherId;
            var ParentDispacher = e.target.getAttribute('rel-parent-dispacher')
            /**New Route Assign method Start here**/
            if (term == "r" || term == "R") {
                const res = await CarService.reassignCar({ id: id, currentDispacher: currentDispacher, ParentDispacher: ParentDispacher })
                return false;
            }
            /**Route Assign method end here**/
            if ((loggedInDispacher == currentDispacher && currentDispacher != ParentDispacher) || (loggedInDispacher == ParentDispacher)) {
                if (term == "a" || term == "A") {
                    return false;
                }
                //validate to CHILD dispacher to dispatch the NET type trip again as NET
                if (term == "N" || term == "n") {
                    alert("Sorry, you don't have permission for this action.");
                    setSelectedOpt("'Send To NET'");
                    return false;
                }

                let res = await CarService.autoCompleteCar({ term });
                if (res && res.status === 200) {
                    let car_no = res.data.result.value;
                    let device_id = res.data.result.id;
                    let call_type_line = res.data.result.call_type_line;
                    let status = res.data.result.status;
                    // sendInfoToAffiliatetriplogFlag=true;
                    sendInfoToAffiliatetriplog(car_no, device_id, id, status, call_type_line);

                }

            } else {
                let res = await CarService.autoCompleteCar({ term });
                if (res && res.status === 200) {
                    let car_no = res.data.result.value;
                    let device_id = res.data.result.id;
                    let call_type_line = res.data.result.call_type_line;
                    let status = res.data.result.status;
                    // sendInfoToAffiliatetriplogFlag=true;
                    sendInfoToCar_triplog(car_no, device_id, id, status, call_type_line);

                }
            }
        }
        else {
            if (value == "c" || value == "C") {
                setSelectedOpt("Car #")
            }
            if (value == "s" || value == "S") {
                setSelectedOpt("Send To All")
            }
            if (value == "l" || value == "L") {
                setSelectedOpt("Line")
            }
            if (value == "n" || value == "N") {
                setSelectedOpt("Send To NET")
            }
            if (value == "d" || value == "D") {
                setSelectedOpt("Auto-Dispatch")
            }
        }

    }

    var handleChnage = (event) => {
        setSelectedOpt(event.target.value);
    }

    let flag = false;
    if (trip['Triplog']['dispacher_id'] != dispacherId) {
        flag = true;
    }
    if (((trip['Triplog']['car_no']).length !== 0 && trip['Triplog']['car_no'] != "Car #")) {
        if (trip['Triplog']['status'] == 0) {
            setUnacceptedCarValue(trip['Triplog']['call_type']);
            if ((trip['Triplog']['car_no']).length !== 0) {
                setUnacceptedCarValue(trip['Triplog']['car_no'])
            }
            if ((trip['Triplog']['pending_car_no']).length !== 0) {
                setUnacceptedCarValue('P' + trip['Triplog']['pending_car_no']);
            }
            let allowreassign = ([1, 5].indexOf(trip['Triplog']['status']) > -1) ? ' allowreassign' : '';
            return (
                <td className={`cntr_algn window.${back_class} window.${allowreassign}`} rel-tripid={trip['Triplog']['id']} rel-affiliate-dispacher={trip['Triplog']['affiliate_accept']} rel-parent-dispacher={trip['Triplog']['parent_dispacher_id']} rel-current-dispacher={dispacherId} on-hold={`NO`}>
                    <input type="text" value={UnacceptedCarValue} id={+trip['Triplog']['id']} rel-affiliate-dispacher={trip['Triplog']['affiliate_accept']} rel-parent-dispacher={trip['Triplog']['parent_dispacher_id']} rel-current-dispacher={dispacherId} rel-call_type={trip['Triplog']['call_type']} className="textfield carAutoComplete" readOnly={flag} />
                </td>
            )
        } else {

            if (dispacherId != trip['Triplog']['dispacher_id'] && trip['Triplog']['call_type'] == 'NET') {
                setCarValue('NET/' + trip['Triplog']['car_no'])
            } else if ((trip['Triplog']['car_no']).length !== 0) {
                setCarValue(trip['Triplog']['car_no'])
            } else if ((trip['Triplog']['pending_car_no']).length !== 0) {
                setCarValue('P' + trip['Triplog']['pending_car_no'])
            } else {
                setCarValue(trip['Triplog']['car_no'])
            }
            return (
                <td className={`cntr_algn window.${back_class} `} rel-tripid={trip['Triplog']['id']} rel-affiliate-dispacher={trip['Triplog']['affiliate_accept']} rel-parent-dispacher={trip['Triplog']['parent_dispacher_id']} rel-current-dispacher={dispacherId} on-hold={`NO`}>
                    {carValue}
                </td>
            )
        }
    } else {
        if (trip['Triplog']['send_order'] == 'all' && trip['Triplog']['call_type'] != 'NET' && trip['Triplog']['multi_suggest'] != 'mult.') {
            setSelectedOpt('Send To All');
        } else if (trip['Triplog']['call_type'] == 'NET') {
            setSelectedOpt('Send To NET');
        } else if ((trip['Triplog']['pending_car_no']).length !== 0) {
            setSelectedOpt('P' + trip['Triplog']['pending_car_no']);
        } else if ((trip['Triplog']['multi_suggest']).length !== 0) {
            setSelectedOpt('mult.');
        }
        return (
            <td className={`cntr_algn window.${back_class}`}>
                <input type="text" onChange={handleChnage} value={selectedOpt} onFocus={(e) => e.target.value = ""} onKeyUp={Autocomplete} name={trip['Triplog']['id']} id={trip['Triplog']['id']} rel-affiliate-dispacher={trip['Triplog']['affiliate_accept']} rel-parent-dispacher={trip['Triplog']['parent_dispacher_id']} rel-current-dispacher={dispacherId} rel-call_type={trip['Triplog']['call_type']} className="textfield carAutoComplete" />
            </td >
        )

    }
}
export default CarAutoComplete;