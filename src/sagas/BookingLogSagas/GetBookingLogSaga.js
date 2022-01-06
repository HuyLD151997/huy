import { call, put, take, delay } from "redux-saga/effects";
import {
  getBookingLogsSuccess,
  getBookingLogsFailed,
} from "../../actions/BookingLog/GetBookingLog.js";

import { getBookingLogsApi } from "../../apis/BookingLog/GetBookingLog";
import * as getBookingLogsConstants from "../../constants/BookingLog/GetBookingLog";

function* getBookingLogSaga() {
  while (true) {
    const action = yield take(getBookingLogsConstants.GET_BOOKING_LOG);

    const res = yield call(getBookingLogsApi, action.payload);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getBookingLogsSuccess(data));
    } else {
      yield put(getBookingLogsFailed(data));
    }
  }
}
export const sagas = [getBookingLogSaga];
