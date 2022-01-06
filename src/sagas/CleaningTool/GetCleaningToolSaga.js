import { call, put, take, delay } from "redux-saga/effects";
import {
  getCleaningToolsSuccess,
  getCleaningToolsFailed,
} from "../../actions/CleaningTool/GetCleaningTool.js";

import { getCleaningToolApi } from "../../apis/CleaningTool/GetCleaningTool";
import * as getCleaningToolConstants from "../../constants/CleaningTool/GetCleaningTool";

function* getCleaningToolSaga() {
  while (true) {
    const action = yield take(getCleaningToolConstants.GET_CLEANING_TOOL);
    const { pageNo, pageSize } = action.payload;
    const res = yield call(getCleaningToolApi, pageNo, pageSize);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      if (data) {
        yield localStorage.setItem("TotalPageCleaningTool", data.total);
      }
      yield put(getCleaningToolsSuccess(data));
    } else {
      yield put(getCleaningToolsFailed(data));
    }
  }
}
export const sagas = [getCleaningToolSaga];
