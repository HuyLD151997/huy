import { call, put, take, delay } from "redux-saga/effects";
import {
  getBookingImagesSuccess,
  getBookingImagesFailed,
} from "../../actions/BookingLog/GetBookingImage.js";

import { getBookingImagesApi } from "../../apis/BookingLog/GetBookingImage";
import * as getBookingImagesConstants from "../../constants/BookingLog/GetBookingImage";

function* getBookingImageSaga() {
  while (true) {
    const action = yield take(getBookingImagesConstants.GET_BOOKING_IMAGE);

    const res = yield call(getBookingImagesApi, action.payload);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getBookingImagesSuccess(data));
    } else {
      yield put(getBookingImagesFailed(data));
    }
  }
}
export const sagas = [getBookingImageSaga];
