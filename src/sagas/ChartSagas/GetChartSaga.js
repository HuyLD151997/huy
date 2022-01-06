import { call, put, take, delay } from "redux-saga/effects";
import {
  getChartsSuccess,
  getChartsFailed,
} from "../../actions/Chart/GetChart.js";

import { getChartsApi } from "../../apis/Chart/GetChart";
import * as getChartsConstants from "../../constants/Chart/GetChart";

function* getChartSaga() {
  while (true) {
    const action = yield take(getChartsConstants.GET_CHART);

    const res = yield call(getChartsApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getChartsSuccess(data));
    } else {
      yield put(getChartsFailed(data));
    }
  }
}
export const sagas = [getChartSaga];
