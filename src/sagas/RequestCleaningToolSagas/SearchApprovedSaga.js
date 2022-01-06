import { call, put, take, delay } from "redux-saga/effects";
import {
  searchApprovedSuccess,
  searchApprovedFailed,
} from "../../actions/RequestCleaningTool/SearchApproved.js";

import { searchApprovedApi } from "../../apis/RequestCleaningTool/SearchApproved";
import * as searchApprovedConstants from "../../constants/RequestCleaningTool/SearchApproved";

function* searchApprovedToolSaga() {
  while (true) {
    const action = yield take(searchApprovedConstants.SEARCH_APPROVED);
    const { pageNo, pageSize, dataS } = action.payload;

    const res = yield call(searchApprovedApi, dataS, pageNo, pageSize);

    const { data, status } = res;

    if (status === 200 || status === 201) {
      console.log(data);
      if (data) {
        yield localStorage.setItem("TotalPageSearchApproved", data.total);
      }
      yield put(searchApprovedSuccess(data));
    } else {
      yield put(searchApprovedFailed(data));
    }
  }
}
export const sagas = [searchApprovedToolSaga];
