import { call, put, take, delay } from "redux-saga/effects";
import {
  searchBookingInWorkingSuccess,
  searchBookingInWorkingFailed,
} from "../../actions/Booking/SearchBookingInWorking.js";

import { searchBookingInWorkingApi } from "../../apis/Booking/SearchBookingInWorking";
import * as searchBookingInWorkingConstants from "../../constants/Booking/SearchBookingInWorking";

function* searchBookingInWorkingSaga() {
  while (true) {
    const action = yield take(
      searchBookingInWorkingConstants.SEARCH_BOOKING_IN_WORKING
    );
    const { pageNo, pageSize, dataS } = action.payload;

    const res = yield call(searchBookingInWorkingApi, dataS, pageNo, pageSize);

    const { data, status } = res;

    if (status === 200 || status === 201) {
      console.log(data);
      if (data) {
        yield localStorage.setItem(
          "TotalPageSearchBookingInWorking",
          data.total
        );
      }
      yield put(searchBookingInWorkingSuccess(data));
    } else {
      yield put(searchBookingInWorkingFailed(data));
    }
  }
}
export const sagas = [searchBookingInWorkingSaga];
