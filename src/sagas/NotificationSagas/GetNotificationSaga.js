import { call, put, take, delay } from "redux-saga/effects";
import {
  getNotificationSuccess,
  getNotificationFailed,
} from "../../actions/Notification/GetNotification.js";

import { getNotificationApi } from "../../apis/Notification/GetNotification";
import * as getNotificationConstants from "../../constants/Notification/GetNotification";

function* getNotificationSaga() {
  while (true) {
    const action = yield take(getNotificationConstants.GET_NOTIFICATION);

    const res = yield call(getNotificationApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getNotificationSuccess(data));
    } else {
      yield put(getNotificationFailed(data));
    }
  }
}
export const sagas = [getNotificationSaga];
