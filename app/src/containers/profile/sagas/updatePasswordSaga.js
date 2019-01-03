// @flow
import firebase from 'firebase';
import * as Keychain from 'react-native-keychain';
import { put, select, takeEvery } from 'redux-saga/effects';
import { UserCreators } from '@redux/reducers/user';
import { UpdatePasswordCreators, UpdatePasswordTypes } from '@containers/profile/redux/updatePasswordReducer';

/**
 *  Update Password task
 */

export function* updatePasswordTask({ payload }) {
  try {
    // request user information
    const store = yield select();
    const user = {};
    yield Object.assign(user, store.user);
    yield firebase.auth().currentUser.updatePassword(payload.password);

    yield put(UpdatePasswordCreators.updatePasswordRequestSuccess(payload.password));
    yield Object.assign(user, { password: payload.password });
    yield put(UserCreators.userSet(user));
    yield Keychain.setGenericPassword(user.email, user.password);
  } catch (error) {
    yield put(
      UpdatePasswordCreators.updatePasswordRequestFailure(error.message ? error.message : JSON.stringify(error)),
    );
  }
}

/**
 * Loop update password saga
 */
export function* updatePasswordSaga() {
  yield takeEvery(UpdatePasswordTypes.UPDATE_PASSWORD_REQUEST, updatePasswordTask);
}
