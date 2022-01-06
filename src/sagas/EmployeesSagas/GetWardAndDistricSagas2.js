import { call, put, take, delay } from "redux-saga/effects";
import {
  getWardsAndDistricsSuccess,
  getWardsAndDistricsFailed,
} from "../../actions/Employees/GetWardAndDistric.js";

import { getGetWardsAndDistricsApi } from "../../apis/Employees/GetWardAndDistric";
import * as getGetWardsAndDistrics from "../../constants/Employee/GetWardAndDistric";
function* getWardsAndDistricsSaga() {
  while (true) {
    const action = yield take(getGetWardsAndDistrics.GET_WARDS_AND_DISTRICS);

    const res = yield call(getGetWardsAndDistricsApi, action.payload);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getWardsAndDistricsSuccess(data));
    } else {
      yield put(getWardsAndDistricsFailed(data));
    }
  }
}
export const sagas = [getWardsAndDistricsSaga];
