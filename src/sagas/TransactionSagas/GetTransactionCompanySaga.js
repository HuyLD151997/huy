import { call, put, take, delay } from "redux-saga/effects";
import {
  getTransactionCompanySuccess,
  getTransactionCompanyFailed,
} from "../../actions/Transaction/GetTransactionCompany.js";

import { getTransactionCompanyApi } from "../../apis/Transaction/GetTransactionCompany";
import * as getTransactionCompanyConstants from "../../constants/Transaction/GetTransactionCompany";

function* getTransactionCompanySaga() {
  while (true) {
    const action = yield take(
      getTransactionCompanyConstants.GET_TRANSACTION_COMPANY
    );
    const { pageNo, pageSize } = action.payload;
    const res = yield call(getTransactionCompanyApi, pageNo, pageSize);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      if (data) {
        yield localStorage.setItem("TotalPageTransactionCompany", data.total);
      }
      yield put(getTransactionCompanySuccess(data));
    } else {
      yield put(getTransactionCompanyFailed(data));
    }
  }
}
export const sagas = [getTransactionCompanySaga];
