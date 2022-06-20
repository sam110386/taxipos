import React from 'react'

const CarValueUnaccepted = (props) => {
    let trip = props.trip
  return (
    <>
       <input type="text" value={props.UnacceptedCarValue} id={trip['Triplog']['id']} rel-affiliate-dispacher={trip['Triplog']['affiliate_accept']} rel-parent-dispacher={trip['Triplog']['parent_dispacher_id']} rel-current-dispacher={props.dispacherId} rel-call_type={trip['Triplog']['call_type']} className="textfield carAutoComplete" readOnly={props.flag} />
    </>
  )
}

export default CarValueUnaccepted;