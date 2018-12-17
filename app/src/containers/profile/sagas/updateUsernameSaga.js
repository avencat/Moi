// @flow
import firebase from 'firebase';
import { put, select, takeEvery } from 'redux-saga/effects';
import { UserCreators } from '@redux/reducers/user';
import { UpdateUsernameCreators, UpdateUsernameTypes } from '@containers/profile/redux/updateUsernameReducer';
import { UpdateDatabaseUsernameCreators } from '@containers/profile/redux/updateDatabaseUsernameReducer';

/**
 *  Update Username task
 */

export function* updateUsernameTask({ payload }) {
  try {
    // request user information
    const store = yield select();
    const user = {};
    yield Object.assign(user, store.user);
    yield firebase.auth().currentUser.updateProfile({ displayName: payload.username });

    yield put(UpdateUsernameCreators.updateUsernameRequestSuccess(payload.username));
    yield Object.assign(user, { displayName: payload.username });
    yield put(UserCreators.userSet(user));
    yield put(UpdateDatabaseUsernameCreators.updateDatabaseUsernameRequest({
      username: payload.username || user.email,
    }));
  } catch (error) {
    yield put(
      UpdateUsernameCreators.updateUsernameRequestFailure(error.message ? error.message : JSON.stringify(error)),
    );
  }
}

/**
 * Loop update username saga
 */
export function* updateUsernameSaga() {
  yield takeEvery(UpdateUsernameTypes.UPDATE_USERNAME_REQUEST, updateUsernameTask);
}
