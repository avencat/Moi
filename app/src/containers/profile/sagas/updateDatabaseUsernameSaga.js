// @flow
import firebase from 'firebase';
import { put, select, takeEvery } from 'redux-saga/effects';
import {
  UpdateDatabaseUsernameCreators,
  UpdateDatabaseUsernameTypes,
} from '@containers/profile/redux/updateDatabaseUsernameReducer';

/**
 *  Update Database Username task
 */

export function* updateDatabaseUsernameTask({ payload }) {
  try {
    // request user information
    const store = yield select();
    const snapshot = yield firebase.database().ref(`/users/${store.user.uid}`).once('value');
    const userData = {};
    const oldUserData = yield snapshot.val();
    yield Object.assign(userData, oldUserData);
    yield Object.assign(userData, {
      timestamp: Date.now(),
      username: payload.username,
    });
    yield firebase.database().ref(`/users/${store.user.uid}`).set(userData);

    yield put(UpdateDatabaseUsernameCreators.updateDatabaseUsernameRequestSuccess(payload.username));
  } catch (error) {
    yield put(
      UpdateDatabaseUsernameCreators.updateDatabaseUsernameRequestFailure(
        error.message ? error.message : JSON.stringify(error),
      ),
    );
  }
}

/**
 * Loop update Database username saga
 */
export function* updateDatabaseUsernameSaga() {
  yield takeEvery(UpdateDatabaseUsernameTypes.UPDATE_DATABASE_USERNAME_REQUEST, updateDatabaseUsernameTask);
}
