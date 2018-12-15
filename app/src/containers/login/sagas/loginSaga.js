import firebase from 'firebase';
import { put, takeEvery } from 'redux-saga/effects';
import { UserCreators } from '@redux/reducers/user';
import { LoginCreators, LoginTypes } from '@containers/login/redux/loginReducer';

/**
 * Auth login task
 */

export function* authLoginTask({ payload }) {
  try {
    // request user information
    const { user } = yield firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
    const userObject = yield JSON.parse(JSON.stringify(user));
    yield Object.assign(userObject, { password: payload.password });
    yield put(LoginCreators.loginRequestSuccess(userObject));
    yield put(UserCreators.userSet(userObject));
  } catch (error) {
    yield put(LoginCreators.loginRequestFailure(error.message ? error.message : error.code));
  }
}

/**
 * Loop login saga
 */
export function* loginSaga() {
  yield takeEvery(LoginTypes.LOGIN_REQUEST, authLoginTask);
}
