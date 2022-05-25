import moment from "moment";
import toast, { Toaster } from 'react-hot-toast';
import * as TriplogServices from '../../../services/TriplogService';
import { store } from "../../../store/store"
import { loadTripListDataSuccess } from "../../../store/actions/TripAction";

export const CreateTrip = async (values) => {
    const onError = (message) => {
        toast.error(message)
        //setError(true);
    };
    try {
        if (typeof (values.pickup_time) == "object") {
            let time = moment(values.pickup_time).format("hh:mm A")
            values.pickup_time = time
        }
        const res = await TriplogServices.createTrip(values);
        if (res && res.status === 200) {
            console.log("here")
            if (res.data && res.data.status === 1) {
                toast.success(res.data.message,"first")
                console.log("here1")
                let res2 = await TriplogServices.getTriplist({});
                // if (res2 && res2.data.status === 200) {
                    console.log("here2")
                    if (res2.data.status === 1) {
                        console.log("here3")
                        let ret={};
                        res.data.result.map((ele,i)=>{
                           ret[ele.Triplog.id]=ele;
                        })
                        store.dispatch(loadTripListDataSuccess(ret))
                        return res2.data.status
                    }
                // }
                return res2.data.status
            }
            onError(res.data.message);
        }
    } catch (err) {
        onError();
    }
}
