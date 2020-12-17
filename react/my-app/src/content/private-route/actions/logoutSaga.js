//调用异步 call
//调用同步 fork
//监听 take | takeEvery
//worker
//watcher

import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import LogoutService from '../service/logout';

//worker saga
function* logoutHandle(action) {
  //登录
  yield put({ type: "REQUEST" });
  try {
    const res = yield call(LogoutService.logout, action.payload)
    yield put({
      type: "LOGOUT_SUCCESS",
      payload: {
        ...res
      }
    })
  } catch (err) {
    yield put({
      type: "LOGOUT_FAILURE",
      payload: {
        ...err
      }
    });
  }
}

//watcher saga
function* logoutSaga() {
  yield takeEvery("LOGOUT_SAGA", logoutHandle)
}

export default logoutSaga