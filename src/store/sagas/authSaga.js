import { put, takeLatest, all } from 'redux-saga/effects';
import {LOAD_USER_DETAILS,SAVE_USER_DETAILS} from "../actions/UserAction";
import{getUserDetails} from "../../services/userServices";


function* loadUserDetail() {
  try {
    const res = yield getUserDetails();
   
    if (res && res.status === 200) {
      if (res.data && res.data.status === 1) {
        yield put({ type: SAVE_USER_DETAILS, data: res.data.result });
        return;
      }
    }
  } catch (err) {
  }
}



function* loadUserDetailWatcher() {
    yield takeLatest(LOAD_USER_DETAILS, loadUserDetail)
}

export default function* rootSaga() {
    yield all([
        loadUserDetailWatcher()
    ]);
}