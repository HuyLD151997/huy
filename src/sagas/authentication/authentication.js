import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginFailed,
  loginSuccess,
} from "../../actions/authentication/authentication.js";
import { login } from "../../apis/authentication/authentication";
import { history } from "../../common/history";
import * as authenticateTypes from "../../constants/Authenticate/Authenticate";

export function* loginSaga() {
  yield takeEvery(authenticateTypes.LOGIN, loginAction);
}

function* loginAction({ payload }) {
  // const action = yield take(authenticateTypes.LOGIN);
  // const {username, password} = action.payload
  const { password, username } = payload;

  try {
    const res = yield call(login, {
      password,
      username,
    });
    // console.log("av");
    const { data, status } = res;
    console.log(data.token);
    if (status === 200) {
      yield put(loginSuccess(data));
      console.log(data);
      yield localStorage.setItem("token", data.token);
      yield localStorage.setItem("fullname", data.fullname);
      yield localStorage.setItem("hasAvatar", data.hasAvatar);
      history.push("/chart");
    }
  } catch (error) {
    console.log("Error catch");
    yield put(loginFailed(error));
  }
}

export const sagas = [loginSaga];
