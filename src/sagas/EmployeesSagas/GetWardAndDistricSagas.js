import { call, put, take, delay } from "redux-saga/effects";
import {
  getWardsAndDistricsSuccess2,
  getWardsAndDistricsFailed2,
} from "../../actions/Employees/GetWardAndDistric2.js";

import { getGetWardsAndDistricsApi } from "../../apis/Employees/GetWardAndDistric";
import * as getGetWardsAndDistrics2 from "../../constants/Employee/GetWardAndDistric2";
function* getWardsAndDistricsSaga2() {
  while (true) {
    const action = yield take(getGetWardsAndDistrics2.GET_WARDS_AND_DISTRICS2);

    const res = yield call(getGetWardsAndDistricsApi, action.payload);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getWardsAndDistricsSuccess2(data));
    } else {
      yield put(getWardsAndDistricsFailed2(data));
    }
  }
}
export const sagas = [getWardsAndDistricsSaga2];
