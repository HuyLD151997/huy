import { call, put, take, delay } from "redux-saga/effects";
import {
  getChartTransactionSuccess,
  getChartTransactionFailed,
} from "../../actions/Chart/GetChartTransaction.js";

import { getChartTransactionApi } from "../../apis/Chart/GetChartTransaction";
import * as getChartTransactionConstants from "../../constants/Chart/GetChartTransaction";

function* getChartTransactionSaga() {
  while (true) {
    const action = yield take(
      getChartTransactionConstants.GET_CHART_TRANSACTION
    );

    const res = yield call(getChartTransactionApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getChartTransactionSuccess(data));
    } else {
      yield put(getChartTransactionFailed(data));
    }
  }
}
export const sagas = [getChartTransactionSaga];
