
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatsidebarDetails from "./ChatsidebarDetails";
import Address_Picker from "../Pickers/Address_Picker";

const Chatsidebar = (props) => {

    const [showDetails, setShowDetails] = useState(false);
    const [uniqueArray,setUniqueArray] = useState(null);
    const [curretPhone,setCurrentPhone] = useState(null)
   
    const { number } = useSelector((state) => {
        return {
            number: state.number,
        };
    });

    useEffect(()=>{
        var uniqueNumArray = [...new Map(number.number.map((item) => [item["Triplog"]["telephone"], item])).values()];
        setUniqueArray(uniqueNumArray)
    },[number])

    const openModal = (telephone) =>{
        setCurrentPhone(telephone)
        setShowDetails(true)
    }
 
    return (
        <>
            <div className="mt-1 chatlogdiv">
                {uniqueArray && uniqueArray.map((e,ind)=>{
                        return (
                            <>
                              <span id="chatlog" onClick={()=>openModal(e.Triplog.telephone)}>{e.Triplog.telephone}</span> <br/>
                            </>
                        )
            })}
            </div>
           {showDetails && <ChatsidebarDetails SetShowCallerId={setShowDetails} curretPhone={curretPhone}/>}
        </>
    )
}

export default Chatsidebar;