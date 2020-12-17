//调用异步 call
//调用同步 fork
//监听 take | takeEvery
//worker
//watcher

import {
  call,
  put,
  // takeEvery,
  take,
  fork,
} from 'redux-saga/effects'
import LoginService from "../service/login"

//worker saga
function* loginHandle(action) {
  //登录
  yield put({ type: "REQUEST" });
  try {
    const res1 = yield call(LoginService.login, action.payload)
    const res2 = yield call(LoginService.getMoreUserInfo, res1)
    yield put({
      type: "LOGIN_SUCCESS",
      payload: {
        ...res2
      }
    })
  } catch (err) {
    yield put({
      type: "LOGIN_FAILURE",
      payload: err
    });
  }
}

//watcher saga
function* loginSaga() {
  yield takeEvery("LOGIN_SAGA", loginHandle)

  // while (true) {
  //   const action = yield take("LOGIN_SAGA");
  //   // call 是阻塞型调用 generator在调用结束之前不执行其他事情
  //   // fork是非阻塞型调用 任务在后台启动 调用者可以继续自己的流程，不用等待fork任务结束
  //   yield fork(loginHandle, action);
  //   console.log("haha", action);
  // }
}

const takeEvery = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });

export default loginSaga