
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Chatsidebar = (props) => {
    const { number } = useSelector((state) => {
        return {
            number: state.number,
        };
    });
   
    return (
        <>
            <div className="mt-1">
                {/* {number.number && number.number.map((e,ind)=>{
                     if(ind < 1){
                        return (
                            <>
                              <span id="chatlog">{e.Triplog.telephone}</span>
                            </>
                        )
                     }
            })} */}
            </div>
        </>
    )
}

export default Chatsidebar;