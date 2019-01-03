import firebase from 'firebase';
import { put, takeEvery } from 'redux-saga/effects';
import { AddUserToDatabaseCreators, AddUserToDatabaseTypes } from '@containers/login/redux/addUserToDatabaseReducer';

/**
 * Auth Add User To Database task
 */

export function* authAddUserToDatabaseTask({ payload }) {
  try {
    // request user information
    const userData = {
      photoURL: null,
      timestamp: Date.now(),
      username: payload.email,
    };
    yield firebase.database().ref(`/users/${payload.uid}`).set(userData);

    yield put(AddUserToDatabaseCreators.addUserToDatabaseRequestSuccess(payload));
  } catch (error) {
    yield put(
      AddUserToDatabaseCreators.addUserToDatabaseRequestFailure(
        error.message ? error.message : JSON.stringify(error),
      ),
    );
  }
}

/**
 * Loop Add User To Database saga
 */
export function* addUserToDatabaseSaga() {
  yield takeEvery(AddUserToDatabaseTypes.ADD_USER_TO_DATABASE_REQUEST, authAddUserToDatabaseTask);
}
