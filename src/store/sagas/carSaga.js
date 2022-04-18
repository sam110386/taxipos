import { put, takeLatest, all } from "redux-saga/effects";
import {
  GET_CAR_QUOTE,
  SAVE_CAR_QUOTE,
  SET_CAR_QUOTE_ERROR,
} from "../actions/CarAction";
import { START_PAGE_LOADER, STOP_PAGE_LOADER } from "../actions/GlobalActions";
import { getVehicleQuote } from "../../services/CarService";

function* getCarQuotes({ data }) {
  yield put({ type: START_PAGE_LOADER });
  try {
    const res = yield getVehicleQuote(data);
    yield put({ type: STOP_PAGE_LOADER });
    if (res && res.status === 200) {
      if (res.data && res.data.status === 1) {
        yield put({ type: SAVE_CAR_QUOTE, data: res.data.result });
        return;
      }
      yield put({ type: SET_CAR_QUOTE_ERROR, error: res.data });
    } else {
      yield put({
        type: SET_CAR_QUOTE_ERROR,
        error: { status: 0, message: "Sotty! something went wrong" },
      });
    }
  } catch (err) {
    yield put({ type: STOP_PAGE_LOADER });
    if (err.response) {
      yield put({ type: SET_CAR_QUOTE_ERROR, error: err.response.data });
    } else
      yield put({
        type: SET_CAR_QUOTE_ERROR,
        error: { status: 0, message: "Sotty! something went wrong" },
      });
  }
}

function* getCarQuotesWatcher() {
  yield takeLatest(GET_CAR_QUOTE, getCarQuotes);
}

export default function* rootSaga() {
  yield all([getCarQuotesWatcher()]);
}
