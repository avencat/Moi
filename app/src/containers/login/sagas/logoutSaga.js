import firebase from 'firebase';
import { put, takeEvery } from 'redux-saga/effects';
import { LogoutCreators, LogoutTypes } from '@containers/login/redux/logoutReducer';

/**
 * Auth logout task
 */
export function* authLogoutTask() {
  try {
    const data = yield firebase.auth().signOut();
    yield put(LogoutCreators.logoutRequestSuccess(JSON.parse(JSON.stringify(data))));
  } catch (error) {
    yield put(LogoutCreators.logoutRequestFailure(error.message ? error.message : error.code));
    // TODO: Do something with the error
  }
}

/**
 * Loop auth saga
 */
export function* logoutSaga() {
  yield takeEvery(LogoutTypes.LOGOUT_REQUEST, authLogoutTask);
}
