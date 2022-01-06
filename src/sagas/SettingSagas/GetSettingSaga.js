import { call, put, take, delay } from "redux-saga/effects";
import {
  getSettingsSuccess,
  getSettingsFailed,
} from "../../actions/Setting/GetSetting.js";

import { getSettingsApi } from "../../apis/Setting/GetSetting";
import * as getSettingsConstants from "../../constants/Setting/GetSetting";

function* getSettingSaga() {
  while (true) {
    const action = yield take(getSettingsConstants.GET_SETTING);

    const res = yield call(getSettingsApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getSettingsSuccess(data));
    } else {
      yield put(getSettingsFailed(data));
    }
  }
}
export const sagas = [getSettingSaga];
