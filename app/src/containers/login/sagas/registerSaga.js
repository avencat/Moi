import firebase from 'firebase';
import { put, takeEvery } from 'redux-saga/effects';
import { UserCreators } from '@redux/reducers/user';
import { RegisterCreators, RegisterTypes } from '@containers/login/redux/registerReducer';

/**
 * Auth register task
 */

export function* registerTask({ payload }) {
  try {
    // request user information
    const { user } = yield firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
    const userObject = yield JSON.parse(JSON.stringify(user));
    yield Object.assign(userObject, { password: payload.password });
    yield put(RegisterCreators.registerRequestSuccess(userObject));
    yield put(UserCreators.userSet(userObject));
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
