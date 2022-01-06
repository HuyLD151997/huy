import { call, put, take, delay } from "redux-saga/effects";
import {
  getTransactionUsersSuccess,
  getTransactionUsersFailed,
} from "../../actions/Transaction/GetTransactionUser.js";

import { getTransactionUsersApi } from "../../apis/Transaction/GetTransactionUser";
import * as getTransactionUsersConstants from "../../constants/Transaction/GetTransactionUser";

function* getTransactionUserSaga() {
  while (true) {
    const action = yield take(
      getTransactionUsersConstants.GET_TRANSACTION_USER
    );
    const { pageNo, pageSize } = action.payload;
    const res = yield call(getTransactionUsersApi, pageNo, pageSize);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      if (data) {
        yield localStorage.setItem("TotalPageTransactionUser", data.total);
      }
      yield put(getTransactionUsersSuccess(data));
    } else {
      yield put(getTransactionUsersFailed(data));
    }
  }
}
export const sagas = [getTransactionUserSaga];
