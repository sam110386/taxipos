import moment from "moment";
import toast, { Toaster } from 'react-hot-toast';
import * as TriplogServices from '../../../services/TriplogService';
import { store } from "../../../store/store"
import { loadTripListDataSuccess } from "../../../store/actions/TripAction";

export const CreateTrip = async (values) => {
    const onError = (message) => {
        toast.error("opps something went wrong")
    };
    try {
        if (typeof (values.pickup_time) == "object") {
            let time = moment(values.pickup_time).format("hh:mm A")
            values.pickup_time = time
        }
        const res = await TriplogServices.createTrip(values);
        if (res && res.status === 200) {
            if (res.data && res.data.status === 1) {
                toast.success(res.data.message)
                let res2 = await TriplogServices.getTriplist({});
                if (res2 && res2.status === 200) {
                    if (res2.data.status === 1) {
                        let ret = {};
                        res2.data.result.map((ele, i) => {
                            ret[ele.Triplog.id] = ele;
                        })
                        store.dispatch(loadTripListDataSuccess(ret))
                        return res2.data.status
                    }
                }
                return res2.data.status
            }
        }
    } catch (err) {
        onError(err);
    }
}
