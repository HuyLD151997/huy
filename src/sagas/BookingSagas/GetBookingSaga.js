import { call, put, take, delay } from "redux-saga/effects";
import {
  getBookingsSuccess,
  getBookingsFailed,
} from "../../actions/Booking/GetBooking.js";

import { getBookingsApi } from "../../apis/Booking/GetBooking";
import * as getBookingsConstants from "../../constants/Booking/GetBooking";

function* getBookingSaga() {
  while (true) {
    const action = yield take(getBookingsConstants.GET_BOOKING);
    const { pageNo, pageSize, id } = action.payload;
    const res = yield call(getBookingsApi, id, pageNo, pageSize);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      if (data) {
        yield localStorage.setItem("TotalPageBooking", data.total);
      }
      yield put(getBookingsSuccess(data));
    } else {
      yield put(getBookingsFailed(data));
    }
  }
}
export const sagas = [getBookingSaga];
