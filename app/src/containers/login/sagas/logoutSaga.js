import firebase from 'firebase';
import { put, takeEvery } from 'redux-saga/effects';
import { LogoutCreators, LogoutTypes } from '@containers/login/redux/logoutReducer';

/**
 * Auth logout task
 */
export function* authLogoutTask({ callback }) {
  try {
    const data = yield firebase.auth().signOut();
    yield put(LogoutCreators.logoutRequestSuccess(JSON.parse(JSON.stringify(data))));
    yield callback();
  } catch (error) {
    yield put(LogoutCreators.logoutRequestFailure(error.message ? error.message : error.code));
    yield callback();
  }
}

/**
 * Loop logout saga
 */
export function* logoutSaga() {
  yield takeEvery(LogoutTypes.LOGOUT_REQUEST, authLogoutTask);
}
