import { call, put, take, delay } from "redux-saga/effects";
import {
  getNewBookingDetailSuccess,
  getNewBookingDetailFailed,
} from "../../actions/Booking/GetNewBookingDetail.js";

import { getNewBookingDetailApi } from "../../apis/Booking/NewBookingDetail";
import * as getNewBookingDetailConstants from "../../constants/Booking/GetNewBookingDetail";
function* getNewBookingDetailSaga() {
  while (true) {
    const action = yield take(
      getNewBookingDetailConstants.GET_NEW_BOOKING_DETAIL
    );

    const res = yield call(getNewBookingDetailApi, action.payload);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getNewBookingDetailSuccess(data));
      console.log(data);
    } else {
      yield put(getNewBookingDetailFailed(data));
    }
  }
}
export const sagas = [getNewBookingDetailSaga];
