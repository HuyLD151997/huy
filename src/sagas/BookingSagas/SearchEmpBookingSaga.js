import { call, put, take, delay } from "redux-saga/effects";
import {
  searchEmpBookingSuccess,
  searchEmpBookingFailed,
} from "../../actions/Booking/SearchEmpBooking.js";

import { searchEmpBookingApi } from "../../apis/Booking/SearchEmpBooking";
import * as searchEmpBookingConstants from "../../constants/Booking/SearchEmpBooking";

function* searchEmpBookingSaga() {
  while (true) {
    const action = yield take(searchEmpBookingConstants.SEARCH_EMP_BOOKING);
    const { dataS } = action.payload;

    const res = yield call(searchEmpBookingApi, dataS);

    const { data, status } = res;

    if (status === 200 || status === 201) {
      console.log(data);
      if (data) {
        yield localStorage.setItem("TotalPageSearchEmpBooking", data.total);
      }
      yield put(searchEmpBookingSuccess(data));
    } else {
      yield put(searchEmpBookingFailed(data));
    }
  }
}
export const sagas = [searchEmpBookingSaga];
