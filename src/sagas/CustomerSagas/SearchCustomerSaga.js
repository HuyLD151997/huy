import { call, put, take, delay } from "redux-saga/effects";
import {
  searchCustomerSuccess,
  searchCustomerFailed,
} from "../../actions/Customer/SearchCustomer.js";

import { searchCustomerApi } from "../../apis/Customer/SearchCustomer";
import * as searchCustomerConstants from "../../constants/Customer/SearchCustomer";

function* searchCustomerToolSaga() {
  while (true) {
    const action = yield take(searchCustomerConstants.SEARCH_CUSTOMER);
    const { pageNo, pageSize, dataS } = action.payload;

    const res = yield call(searchCustomerApi, dataS, pageNo, pageSize);

    const { data, status } = res;

    if (status === 200 || status === 201) {
      console.log(data);
      if (data) {
        yield localStorage.setItem("TotalPageSearchCustomer", data.total);
      }
      yield put(searchCustomerSuccess(data));
    } else {
      yield put(searchCustomerFailed(data));
    }
  }
}
export const sagas = [searchCustomerToolSaga];
