import { call, put, take, delay } from "redux-saga/effects";
import {
  searchEmployeeSuccess,
  searchEmployeeFailed,
} from "../../actions/Employees/SearchEmployee.js";

import { searchEmployeesApi } from "../../apis/Employees/SearchEmployeesApi";
import * as searchEmployeeConstants from "../../constants/Employee/SearchEmployee";

function* searchEmployeeToolSaga() {
  while (true) {
    const action = yield take(searchEmployeeConstants.SEARCH_EMPLOYEE);
    const { pageNo, pageSize, dataS } = action.payload;

    const res = yield call(searchEmployeesApi, dataS, pageNo, pageSize);

    const { data, status } = res;

    if (status === 200 || status === 201) {
      console.log(data);
      if (data) {
        yield localStorage.setItem("TotalPageSearchEmployee", data.total);
      }
      yield put(searchEmployeeSuccess(data));
    } else {
      yield put(searchEmployeeFailed(data));
    }
  }
}
export const sagas = [searchEmployeeToolSaga];
