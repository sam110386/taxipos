import React, { useState } from "react";
import * as CarService from "../../services/CarService"

const CarAutoComplete = (props) => {

    const [selectedOpt, setSelectedOpt] = useState(props.carName?props.carName:'Car #')

    let trip = props.trip
    let dispacherId = props.dispacherId;
   




    // let sendInfoToAffiliatetriplog =  async(car_no, device_id, id, status, call_type_line) => {
    //     // if(!sendInfoToAffiliatetriplogFlag){
    //     //     return;
    //     // }
    //     var call_type = '';
    //     if (status === "deactivated") {
    //         alert("Car # " + car_no + " is Deactivated. Speak to Management.");
    //         return false;
    //     }
    //     if (status === "not_found") {
    //         alert("Car # " + car_no + " does not exist.");
    //         return false;
    //     }
    //     if (status === "not_booked") {
    //         alert("Car # " + car_no + " is not booked in.");
    //         return false;
    //     }
    //     if (status === "no_lined_device") {
    //         alert("No lined device found.");
    //         return false;
    //     } else if (status === "lined_device") {
    //         call_type = call_type_line;
    //     }
    //     if (status === "net_activated") {
    //         call_type = 'NET';
    //     }
    //     var params = { id, device_id, car_no, call_type }
    //     let res = await CarService.reassignAffiliate(params)
    //     console.log("ypdat",res)
    //     if (res && res.status === 200) {
    //         if (res.data && res.data.status === 1) {
    //             reloadTripDetails(id,"update")
    //             //sendInfoToAffiliatetriplogFlag=false;//will avaoid the call to resend
    //         }
    //     }
    

    // //     // window.$("#" + id + "").removeClass('focused');
    // //     // window.$("#" + id + "").blur();
    // //     // window.$.ajax({
    // //     //     // url: SITE_URL+"affiliate_partners/reassign_affiliate_dispatch",
    // //     //     type: "post",
    // //     //     data: params,
    // //     //     async: false,
    // //     //     success: function(data) {
    // //     //         grabTripDetails(id,'Edit');
    // //     //         sendInfoToAffiliatetriplogFlag=false;//will avaoid the call to resend
    // //     //     }
    // //     // });
    // }

    // let sendInfoToCar_triplog = async(car_no, device_id, id, status, call_type_line)=> {

    //     var call_type = '';
    //     if (status === "deactivated") {
    //         setSelectedOpt('')
    //         // $("#" + id + "").focus();
    //         alert("Car # " + car_no + " is Deactivated. Speak to Management.");
    //         return false;
    //     }
    //     if (status === "not_found") {
    //         setSelectedOpt('')
    //         // $("#" + id + "").focus();
    //         alert("Car # " + car_no + " does not exist.");
    //         return false;
    //     }
    //     if (status === "not_booked") {
    //         setSelectedOpt('')
    //         // $("#" + id + "").focus();
    //         alert("Car # " + car_no + " is not booked in.");
    //         return false;
    //     }
    //     if (status === "no_lined_device") {
    //         setSelectedOpt('')
    //         // $("#" + id + "").focus();
    //         alert("No lined device found.");
    //         return false;
    //     } else if (status === "lined_device") {
    //         setSelectedOpt('')
    //         call_type = call_type_line;
    //     }
    //     if (status === "net_activated") {
    //         setSelectedOpt('')
    //         // $("#" + id + "").focus();
    //         call_type = 'NET';

    //     }
    //     if (status === "auto_activated") {
    //         setSelectedOpt('')
    //         // $("#" + id + "").focus();
    //         call_type = '';

    //     }

    //     var params = { id, device_id, car_no,call_type }
    //     // $("#" + id + "").removeClass('focused');
    //     // $("#" + id + "").blur();
    //     let res = await CarService.carAssignment(params)
    //     // console.log(res,"myres")
    //     // $.ajax({
    //     //     url: SITE_URL + "dispachers/send_push_notification_direct",
    //     //     type: "post",
    //     //     data: params,
    //     //     async: false,
    //     //     success: function (data) {

    //     //     }
    //     // });
    // }


    const Autocomplete = async (e) => {
        var id = e.currentTarget.id;
        var value = e.target.value;
        let opt;
        // alert("me too listioning");
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

    return (
        <input type="text" onChange={handleChnage} value={selectedOpt} onFocus={(e) => e.target.value = ""} onKeyUp={Autocomplete} name={trip['Triplog']['id']} id={trip['Triplog']['id']} rel-affiliate-dispacher={trip['Triplog']['affiliate_accept']} rel-parent-dispacher={trip['Triplog']['parent_dispacher_id']} rel-current-dispacher={dispacherId} rel-call_type={trip['Triplog']['call_type']} className="textfield carAutoComplete" />
    )
}
export default CarAutoComplete;