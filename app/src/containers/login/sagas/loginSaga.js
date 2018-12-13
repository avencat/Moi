import firebase from 'firebase';
import { put, takeEvery } from 'redux-saga/effects';
import { LoginCreators, LoginTypes } from '@containers/login/redux/loginReducer';

/**
 * Auth login task
 */

export function* authLoginTask({ payload }) {
  // set authorization bearer for api calls
  try {
    // request user information
    const { user } = yield firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
    yield put(LoginCreators.loginRequestSuccess(JSON.parse(JSON.stringify(user))));
  } catch (error) {
    yield put(LoginCreators.loginRequestFailure(error.message ? error.message : error.code));
  }
}

/**
 * Loop auth saga
 */
export function* loginSaga() {
  yield takeEvery(LoginTypes.LOGIN_REQUEST, authLoginTask);
}
