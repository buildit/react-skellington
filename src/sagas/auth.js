import 'regenerator-runtime/runtime'

import { call, put } from 'redux-saga/effects'

import browserHistory from '../history'

import api from '../api'

import {
  loginSuccess,
  loginFailure,
  setClient,
  resetUi,
  resetUser,
} from '../actions'

export function* login(action) {
  try {
    const user = yield call(api.login, action.payload.email, action.payload.password)
    yield put(setClient(user))
    yield put(resetUi())
    yield put(loginSuccess())
    localStorage.setItem('user', JSON.stringify(user))
    browserHistory.push('/dashboard')
  } catch (error) {
    // TODO: Catch meaningful errors from above
    // and pass them to `loginFailure`
    const sameErrorMessageForAllFailures = 'Oops! Login failed. Please try again.'
    yield put(loginFailure(new Error(sameErrorMessageForAllFailures)))
  }
}

export function* logout() {
  yield put(resetUser())
  localStorage.removeItem('user')
  browserHistory.push('/login')
}