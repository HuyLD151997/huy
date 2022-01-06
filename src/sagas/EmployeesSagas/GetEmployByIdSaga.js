import { call, put, take, delay } from "redux-saga/effects";
import {
  getEmployeeByIdSuccess,
  getEmployeeByIdFailed,
} from "../../actions/Employees/GetEmployById";

import { getEmployeeByIdApi } from "../../apis/Employees/GetEmployById";
import * as getEmployeeById from "../../constants/Employee/GetEmployeeById";
function* getEmployeeByIdSaga() {
  while (true) {
    const action = yield take(getEmployeeById.GET_EMPLOYEES_BY_ID);

    const res = yield call(getEmployeeByIdApi, action.payload);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getEmployeeByIdSuccess(data));
    } else {
      yield put(getEmployeeByIdFailed(data));
    }
  }
}
export const sagas = [getEmployeeByIdSaga];
