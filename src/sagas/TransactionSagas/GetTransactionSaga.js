import { call, put, take, delay } from "redux-saga/effects";
import {
  getTransactionsSuccess,
  getTransactionsFailed,
} from "../../actions/Transaction/GetTransaction.js";

import { getTransactionsApi } from "../../apis/Transaction/GetTransaction";
import * as getTransactionsConstants from "../../constants/Transaction/GetTransaction";

function* getTransactionSaga() {
  while (true) {
    const action = yield take(getTransactionsConstants.GET_TRANSACTION);

    const res = yield call(getTransactionsApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getTransactionsSuccess(data));
    } else {
      yield put(getTransactionsFailed(data));
    }
  }
}
export const sagas = [getTransactionSaga];
