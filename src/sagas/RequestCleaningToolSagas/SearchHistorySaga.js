import { call, put, take, delay } from "redux-saga/effects";
import {
  searchHistorySuccess,
  searchHistoryFailed,
} from "../../actions/RequestCleaningTool/SearchHistory.js";

import { searchHistoryApi } from "../../apis/RequestCleaningTool/SearchHistory";
import * as searchHistoryConstants from "../../constants/RequestCleaningTool/SearchHistory";

function* searchHistoryToolSaga() {
  while (true) {
    const action = yield take(searchHistoryConstants.SEARCH_HISTORY);
    const { pageNo, pageSize, dataS } = action.payload;

    const res = yield call(searchHistoryApi, dataS, pageNo, pageSize);

    const { data, status } = res;

    if (status === 200 || status === 201) {
      console.log(data);
      if (data) {
        yield localStorage.setItem("TotalPageSearchHistory", data.total);
      }
      yield put(searchHistorySuccess(data));
    } else {
      yield put(searchHistoryFailed(data));
    }
  }
}
export const sagas = [searchHistoryToolSaga];
