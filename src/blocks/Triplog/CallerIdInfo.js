import React, { useEffect, useState, useRef } from "react";
import * as TriplogServices from '../../services/TriplogService';
import CallerIdDetails from "./CallerIdDetails";

const CallerIdInfo = () => {

    let arr1 = [1,,2,3,4]
    const [callerTripInfo, setCallerTripInfo] = useState([])
    const [showDetails, setShowDetails] = useState(false);
 

    const onError = () => {

    }

    const LoadCallorInfoTripLog = async () => {
        try {
            const res = await TriplogServices.loadCallerInfoTriplog();

        } catch (err) {
            onError();
        }

        try {
            const res = await TriplogServices.loadCallerInfoTriplog();
            if (res && res.status === 200) {
                if (res.data && res.data.status === 1) {
                    setCallerTripInfo(res.data.result.phone_data)
                }
                onError(res.data.message);
            }
        } catch (err) {
            onError();
        }
    }


    useEffect(() => {
        setInterval(() => {
            LoadCallorInfoTripLog()
        }, 30000)
    }, [])





    const openCallerIdDetail = () => {
        setShowDetails(true)
    }

   
    const arrr = [
        {
            UrlSend: {
                "id": "59",
                "Line": "1",
                "Phone": "10",
                "Name": "Imran",
                "created": "2022-05-02 04:40:34"
            }
        },
        {
            UrlSend: {
                "id": "59",
                "Line": "2",
                "Phone": "20",
                "Name": "Imran",
                "created": "2022-05-02 04:40:34"
            }
        },
        {
            UrlSend: {
                "id": "59",
                "Line": "3",
                "Phone": "30",
                "Name": "Imran",
                "created": "2022-05-02 04:40:34"
            }
        },
        {
            UrlSend: {
                "id": "59",
                "Line": "4",
                "Phone": "40",
                "Name": "Imran",
                "created": "2022-05-02 04:40:34"
            }
        },
        {
            UrlSend: {
                "id": "59",
                "Line": "5",
                "Phone": "50",
                "Name": "Imran",
                "created": "2022-05-02 04:40:34"
            }
        },
        {
            UrlSend: {
                "id": "59",
                "Line": "6",
                "Phone": "60",
                "Name": "Imran",
                "created": "2022-05-02 04:40:34"
            }
        },


     

    ]


    return (
        <>
            <div id="latestCallerInfo" >
            {/* <table class="blank_ul">

                <tr class="inner_div">
                <th class="mid_th comtab" >F1</th>
                <th class="mid_th text-center" width="100"  ></th>
                <th class="mid_th"></th>
                </tr>
                <tr class="inner_div">
                <th class="mid_th comtab" >F2</th>
                <th class="mid_th text-center" width="100"  ></th>
                <th class="mid_th"></th>
                </tr>
                <tr class="inner_div">
                <th class="mid_th comtab" >F3</th>
                <th class="mid_th text-center" width="100"  ></th>
                 <th class="mid_th"></th>
                </tr>

            </table> */}
            
                {arr1.length > 0 && arr1.map((el, index, caller) => {
                    
                        return (
                            <table class="blank_ul">

                                {callerTripInfo.map((el2, index2,arr) => {
                                    
                                    if (index2 < 3) {
                                        let f_numb;
                                        if (index == 0) {
                                            f_numb = index2 + 1;
                                        } else if (index == 1) {
                                            f_numb = index2 + 3;
                                        } else if (index == 2) {
                                            f_numb = index2 + 6;
                                        } else {
                                            f_numb = index2 + 9;
                                        }

                                        let j = 0;
                                        let th_flag = 0;

                                        return (
                                            <tr class="inner_div">
                                                <th class="mid_th comtab" >F{f_numb}</th>
                                                {arr.map((ele3,index3,array)=>{
                                                    if(ele3.UrlSend.Line == f_numb){
                                                        th_flag = 1
                                                        return (
                                                            <>
                                                            <th class="mid_th text-center" width="100"  >{ele3.UrlSend.Phone}</th>
                                                            <th class="mid_th"></th>
                                                            </>
                                                        )
                                                        
                                                    }
                                                    j++
                                                })}
                                               
                                            </tr>
                                        )
                                        
                                    }
                                }
                                )}

                            </table>
                        )
                    
                })}
            </div>

            {showDetails && <CallerIdDetails SetShowTrip={setShowDetails} />}
        </>
    )
}

export default CallerIdInfo;


// <?php for ($i = 1; $i < 5; $i++) { ?>
//     <table  class="blank_ul">
//         <?php for ($k = 1; $k < 4; $k++) { ?>
//             <tr class="inner_div">
//                 <?php
//                 if ($i == 1) {
//                     $f_numb = $k;
//                 } elseif ($i == 2) {
//                     $f_numb = $k + 3;
//                 } elseif ($i == 3) {
//                     $f_numb = $k + 6;
//                 }else{
//                     $f_numb = $k + 9;
//                 }
//                 ?>
//                 <th style="width:26px;" class="mid_th"><?php echo 'F' . $f_numb; ?></th>
//                 <?php
//                 $j = 0;
//                 $th_flag = 0;
//                 foreach ($phone_data as $data):
                    
//                     if ($data['UrlSend']['Line'] == $f_numb) {
//                         $th_flag = 1;
//                         ?>
//                         <th style="width:100px;" id="<?php echo 'F' . $data['UrlSend']['Line']; ?>" class="mid_th loop_data" onclick="tr_click(<?php echo $data['UrlSend']['id']; ?>, $(this));">
//                             <?php echo $data['UrlSend']['Phone']; ?>
//                         </th>
//                         <th class="mid_th">
//                             <?php echo substr($address[$j], 0, 30) . '...'; ?>
//                         </th>
//                         <?php
//                     }
//                     $j++;

//                 endforeach;

//                 if ($th_flag == 0) {
//                     echo '<th class="mid_th" width="100"></th><th class="mid_th"></th>';
//                 }
//                 ?>
//             </tr>

//         <?php } ?>
//     </table>
// <?php } ?>
 