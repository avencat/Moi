import firebase from 'firebase';
import { put, takeEvery } from 'redux-saga/effects';
import { RegisterCreators, RegisterTypes } from '@containers/login/redux/registerReducer';

/**
 * Auth login task
 */

export function* registerTask({ payload }) {
  // set authorization bearer for api calls
  try {
    // request user information
    const { user } = yield firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
    yield put(RegisterCreators.registerRequestSuccess(JSON.parse(JSON.stringify(user))));
  } catch (error) {
    yield put(RegisterCreators.registerRequestFailure(error.message ? error.message : error.code));
  }
}

/**
 * Loop register saga
 */
export function* registerSaga() {
  yield takeEvery(RegisterTypes.REGISTER_REQUEST, registerTask);
}
