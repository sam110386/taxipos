import moment from "moment";
import toast, { Toaster } from 'react-hot-toast';
import * as TriplogServices from '../../../services/TriplogService';
import { store } from "../../../store/store"
import { loadTripListDataSuccess } from "../../../store/actions/TripAction";

export const CreateTrip = async (values) => {
    console.log("values===>", values)
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
            if (res.data && res.data.status === 1) {

                const res2 = await TriplogServices.getTriplist({});
                if (res2 && res2.status === 200) {
                    if (res2.data && res2.data.status === 1) {
                        store.dispatch(loadTripListDataSuccess(res2.data.result))
                        toast.success(res.data.message)
                        return res2.data.status
                    }
                }
                toast.success(res.data.message)
                // onSuccess(res.data);
                return;
            }
            onError(res.data.message);
        }
    } catch (err) {
        onError();
    }
}
