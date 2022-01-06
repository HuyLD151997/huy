import { call, put, take, delay } from "redux-saga/effects";
import {
  getNewBookingsSuccess,
  getNewBookingsFailed,
} from "../../actions/Booking/GetNewBooking.js";

import { getNewBookingsApi } from "../../apis/Booking/GetNewBooking";
import * as getNewBookingsConstants from "../../constants/Booking/GetNewBooking";

function* getNewBookingSaga() {
  while (true) {
    const action = yield take(getNewBookingsConstants.GET_NEW_BOOKING);
    const { pageNo, pageSize, id } = action.payload;
    const res = yield call(getNewBookingsApi, id, pageNo, pageSize);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      if (data) {
        yield localStorage.setItem("TotalPageNewBooking", data.total);
      }
      yield put(getNewBookingsSuccess(data));
    } else {
      yield put(getNewBookingsFailed(data));
    }
  }
}
export const sagas = [getNewBookingSaga];
