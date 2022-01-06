import { call, put, take, delay } from "redux-saga/effects";
import {
  searchCleaningToolSuccess,
  searchCleaningToolFailed,
} from "../../actions/CleaningTool/SearchCleaningTool.js";

import { searchCleaningToolApi } from "../../apis/CleaningTool/SearchCleaningTool";
import * as searchCleaningToolConstants from "../../constants/CleaningTool/SearchCleaningTool";

function* searchCleaningToolSaga() {
  while (true) {
    const action = yield take(searchCleaningToolConstants.SEARCH_CLEANING_TOOL);
    const { pageNo, pageSize, dataS } = action.payload;

    const res = yield call(searchCleaningToolApi, pageNo, pageSize, dataS);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      console.log(data);
      if (data) {
        yield localStorage.setItem("TotalPageSearchCleaningTool", data.total);
      }
      yield put(searchCleaningToolSuccess(data));
    } else {
      yield put(searchCleaningToolFailed(data));
    }
  }
}
export const sagas = [searchCleaningToolSaga];
