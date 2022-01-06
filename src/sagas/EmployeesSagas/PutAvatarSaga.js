import { call, put, take, delay } from "redux-saga/effects";
import {
  putAvatarSuccess,
  putAvatarFailed,
} from "../../actions/Employees/PutAvatar.js";

import { putAvatarApi } from "../../apis/Employees/PutAvatar";
import * as putAvatar from "../../constants/Employee/PutAvatar";
function* putAvatarSaga() {
  while (true) {
    const action = yield take(putAvatar.PUT_AVATAR);

    const res = yield call(putAvatarApi, action.payload);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(putAvatarSuccess(data));
    } else {
      yield put(putAvatarFailed(data));
    }
  }
}
export const sagas = [putAvatarSaga];
