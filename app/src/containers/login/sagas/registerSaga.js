import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { put, takeEvery } from 'redux-saga/effects';
import { UserCreators } from '@redux/reducers/user';
import { RegisterCreators, RegisterTypes } from '@containers/login/redux/registerReducer';
import { AddUserToDatabaseCreators } from '@containers/login/redux/addUserToDatabaseReducer';

/**
 * Auth register task
 */

export function* registerTask({ payload }) {
  try {
    // request user information
    const { user } = yield firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
    yield Keychain.resetGenericPassword();
    yield AsyncStorage.setItem('@MoiAsyncStorage:touchIdEnabled', 'false');
    const userObject = yield JSON.parse(JSON.stringify(user));
    yield Object.assign(userObject, { password: payload.password });
    yield put(RegisterCreators.registerRequestSuccess(userObject));
    yield put(UserCreators.userSet(userObject));
    yield put(AddUserToDatabaseCreators.addUserToDatabaseRequest(userObject));
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
