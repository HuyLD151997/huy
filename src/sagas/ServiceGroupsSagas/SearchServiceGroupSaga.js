import { call, put, take, delay } from "redux-saga/effects";
import {
  searchServiceGroupSuccess,
  searchServiceGroupFailed,
} from "../../actions/ServicesGroup/SearchServiceGroup.js";

import { searchServiceGroupApi } from "../../apis/ServiceGroup/SearchServiceGroup";
import * as searchServiceGroupConstants from "../../constants/ServiceGroup/SearchServiceGroup";

function* searchServiceGroupToolSaga() {
  while (true) {
    const action = yield take(searchServiceGroupConstants.SEARCH_SERVICE_GROUP);
    const { pageNo, pageSize, dataS } = action.payload;
    const res = yield call(searchServiceGroupApi, pageNo, pageSize, dataS);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      console.log(data);
      if (data) {
        yield localStorage.setItem("TotalPageSearchServiceGroup", data.total);
      }
      yield put(searchServiceGroupSuccess(data));
    } else {
      yield put(searchServiceGroupFailed(data));
    }
  }
}
export const sagas = [searchServiceGroupToolSaga];
