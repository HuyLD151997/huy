import { call, put, take, delay } from "redux-saga/effects";
import {
  getBookingDoneSuccess,
  getBookingDoneFailed,
} from "../../actions/Booking/GetBookingDone.js";

import { getBookingDoneApi } from "../../apis/Booking/GetBookingDone";
import * as getBookingDoneConstants from "../../constants/Booking/GetBookingDone";

function* getBookingDoneSaga() {
  while (true) {
    const action = yield take(getBookingDoneConstants.GET_BOOKING_DONE);
    const { pageNo, pageSize, id } = action.payload;
    const res = yield call(getBookingDoneApi, id, pageNo, pageSize);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      if (data) {
        yield localStorage.setItem("TotalPageBookingDone", data.total);
      }
      yield put(getBookingDoneSuccess(data));
    } else {
      yield put(getBookingDoneFailed(data));
    }
  }
}
export const sagas = [getBookingDoneSaga];
