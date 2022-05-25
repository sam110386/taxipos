import * as React  from 'react';
import  {useEffect} from 'react'

export const NotificationPicker = ({ field, form, id, ...props }) => {
    const [Notification, setNotification] = React.useState([]);
    const {name,vlaue} = field;

    const CreateNotification = () => {
        var interval = 10;
        var notification = [];
        var tt = 0;
        for (var i = 0; tt < 24 * 60; i++) {
            var hh = Math.floor(tt / 60);
            var mm = (tt % 60);
            notification[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2)
            tt = tt + interval;
        }
        setNotification(notification)
    }
    useEffect(()=>{
        CreateNotification()
    },[])
    return <select name={name} id={id} {...field} {...props}>
        {Notification && Notification.map((ele, ind) => (
            <>
                <option key={ind.toString()} value={ele}>{ele}</option>
            </>
        ))}
    </select>
}