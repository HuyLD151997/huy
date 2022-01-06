import { call, put, take, delay } from "redux-saga/effects";
import {
  searchServiceSuccess,
  searchServiceFailed,
} from "../../actions/ServicesGroup/SearchService.js";

import { searchServiceApi } from "../../apis/Service/SearchService";
import * as searchServiceConstants from "../../constants/ServiceGroup/SearchService";

function* searchServiceToolSaga() {
  while (true) {
    const action = yield take(searchServiceConstants.SEARCH_SERVICE);
    const { pageNo, pageSize, dataS, id } = action.payload;
    console.log(dataS);
    const res = yield call(searchServiceApi, id, dataS, pageNo, pageSize);
    console.log(dataS);
    const { data, status } = res;
    console.log(data);
    if (status === 200 || status === 201) {
      console.log(data);
      if (data) {
        yield localStorage.setItem("TotalPageSearchService", data.total);
      }
      yield put(searchServiceSuccess(data));
    } else {
      yield put(searchServiceFailed(data));
    }
  }
}
export const sagas = [searchServiceToolSaga];
