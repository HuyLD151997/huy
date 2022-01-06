import { call, put, take, delay } from "redux-saga/effects";
import {
  getProvincesSuccess,
  getProvincesFailed,
} from "../../actions/Employees/GetProvince.js";

import { getProvincesApi } from "../../apis/Employees/GetProvince";
import * as getProvincesConstants from "../../constants/Employee/GetProvince";

function* getProvincesSaga() {
  while (true) {
    const action = yield take(getProvincesConstants.GET_PROVINCES);

    const res = yield call(getProvincesApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getProvincesSuccess(data));
    } else {
      yield put(getProvincesFailed(data));
    }
  }
}
export const sagas = [getProvincesSaga];
