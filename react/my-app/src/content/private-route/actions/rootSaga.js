import { all } from 'redux-saga/effects'
import loginSaga from './loginSaga'
import logoutSaga from './logoutSaga'

export default function* () {
  yield all([
    loginSaga(),
    logoutSaga(),
  ])
}