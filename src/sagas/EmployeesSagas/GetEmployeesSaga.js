import { call, put, take, delay } from "redux-saga/effects";
import {
  getEmployeesSuccess,
  getEmployeesFailed,
} from "../../actions/Employees/GetEmployees.js";

import { getEmployeesApi } from "../../apis/Employees/GetEmployeesApi";
import * as getEmployeesConstants from "../../constants/Employee/GetEmployees";

function* getEmployeesSaga() {
  while (true) {
    const action = yield take(getEmployeesConstants.GET_EMPLOYEES);
    const { pageNo, pageSize } = action.payload;
    const res = yield call(getEmployeesApi, pageNo, pageSize);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      if (data) {
        yield localStorage.setItem("TotalPageEmployee", data.total);
      }
      yield put(getEmployeesSuccess(data));
    } else {
      yield put(getEmployeesFailed(data));
    }
  }
}
export const sagas = [getEmployeesSaga];
