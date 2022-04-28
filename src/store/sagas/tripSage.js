import { put, takeLatest, all } from 'redux-saga/effects';
import { TRIP_LIST_SUCCESS,TRIP_LIST_FAIL,TRIP_LIST_LOAD } from '../actions/TripAction';
import { getTriplist } from '../../services/TriplogService';
import{getUserDetails} from "../../services/userServices";


function* loadUserDetail() {
  try {
    const res = yield getTriplist();
   
    if (res && res.status === 200) {
      if (res.data && res.data.status === 1) {
        yield put({ type: TRIP_LIST_SUCCESS, data: res.data.result });
        return;
      }
    }
  } catch (err) {
  }
}



function* loadTripDetailWatcher() {
    yield takeLatest(TRIP_LIST_LOAD, loadUserDetail)
}

export default function* rootSaga() {
    yield all([
        loadTripDetailWatcher()
    ]);
}