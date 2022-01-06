import { call, put, take, delay } from "redux-saga/effects";
import {
  getBookingInWorkingSuccess,
  getBookingInWorkingFailed,
} from "../../actions/Booking/GetBookingInWorking.js";

import { getBookingInWorkingApi } from "../../apis/Booking/GetBookingInWorking";
import * as getBookingInWorkingConstants from "../../constants/Booking/GetBookingInWorking";

function* getBookingInWorkingSaga() {
  while (true) {
    const action = yield take(
      getBookingInWorkingConstants.GET_BOOKING_IN_WORKING
    );
    const { pageNo, pageSize } = action.payload;
    const res = yield call(getBookingInWorkingApi, pageNo, pageSize);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      if (data) {
        yield localStorage.setItem("TotalPageBookingInWorking", data.total);
      }
      yield put(getBookingInWorkingSuccess(data));
    } else {
      yield put(getBookingInWorkingFailed(data));
    }
  }
}
export const sagas = [getBookingInWorkingSaga];
