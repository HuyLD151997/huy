import { call, put, take, delay } from "redux-saga/effects";
import {
  getBookingDetailSuccess,
  getBookingDetailFailed,
} from "../../actions/Booking/GetBookingDetail.js";

import { getBookingDetailApi } from "../../apis/Booking/BookingDetail";
import * as getBookingDetail from "../../constants/Booking/GetBookingDetail";
function* getBookingDetailSaga() {
  while (true) {
    const action = yield take(getBookingDetail.GET_BOOKING_DETAIL);

    const res = yield call(getBookingDetailApi, action.payload);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getBookingDetailSuccess(data));
      console.log(data);
    } else {
      yield put(getBookingDetailFailed(data));
    }
  }
}
export const sagas = [getBookingDetailSaga];
