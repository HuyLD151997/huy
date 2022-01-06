import { call, put, take, delay } from "redux-saga/effects";
import {
  getRequestCleaningToolHistorySuccess,
  getRequestCleaningToolHistoryFailed,
} from "../../actions/RequestCleaningTool/GetRequestCleaningToolHistory.js";

import { getRequestCleaningToolHistoryApi } from "../../apis/RequestCleaningTool/GetRequestCleaningToolHistoryApi";
import * as getRequestCleaningToolHistoryConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolHistory";

function* getRequestCleaningToolHistorySaga() {
  while (true) {
    const action = yield take(
      getRequestCleaningToolHistoryConstants.GET_REQUEST_CLEANING_TOOL_HISTORY
    );
    const { pageNo, pageSize } = action.payload;
    const res = yield call(getRequestCleaningToolHistoryApi, pageNo, pageSize);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      if (data) {
        yield localStorage.setItem(
          "TotalPageHistoryRequestCleaningTool",
          data.total
        );
      }
      yield put(getRequestCleaningToolHistorySuccess(data));
    } else {
      yield put(getRequestCleaningToolHistoryFailed(data));
    }
  }
}
export const sagas = [getRequestCleaningToolHistorySaga];
