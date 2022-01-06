import { call, put, take, delay } from "redux-saga/effects";
import {
  searchPendingSuccess,
  searchPendingFailed,
} from "../../actions/RequestCleaningTool/SearchPending.js";

import { searchPendingApi } from "../../apis/RequestCleaningTool/SearchPending";
import * as searchPendingConstants from "../../constants/RequestCleaningTool/SearchPending";

function* searchPendingToolSaga() {
  while (true) {
    const action = yield take(searchPendingConstants.SEARCH_PENDING);
    const { pageNo, pageSize, dataS } = action.payload;

    const res = yield call(searchPendingApi, dataS, pageNo, pageSize);

    const { data, status } = res;

    if (status === 200 || status === 201) {
      console.log(data);
      if (data) {
        yield localStorage.setItem("TotalPageSearchPending", data.total);
      }
      yield put(searchPendingSuccess(data));
    } else {
      yield put(searchPendingFailed(data));
    }
  }
}
export const sagas = [searchPendingToolSaga];
