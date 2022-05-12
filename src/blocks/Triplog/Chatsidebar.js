
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatsidebarDetails from "./ChatsidebarDetails";
import Address_Picker from "../Pickers/Address_Picker";

const Chatsidebar = (props) => {

    const [showDetails, setShowDetails] = useState(false);
   
    const { number } = useSelector((state) => {
        return {
            number: state.number,
        };
    });

    const openModal = () =>{
        setShowDetails(true)
    }
   
    return (
        <>
            <div className="mt-1">
                {number.number && number.number.map((e,ind)=>{
                     if(ind < 1){
                        return (
                            <>
                              <span id="chatlog" onClick={openModal}>{e.Triplog.telephone}</span>
                            </>
                        )
                     }
            })}
            </div>
           {showDetails && <ChatsidebarDetails SetShowCallerId={setShowDetails} />}
        </>
    )
}

export default Chatsidebar;