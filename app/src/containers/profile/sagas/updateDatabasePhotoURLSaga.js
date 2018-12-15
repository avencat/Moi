// @flow
import firebase from 'firebase';
import { put, select, takeEvery } from 'redux-saga/effects';
import {
  UpdateDatabasePhotoURLCreators,
  UpdateDatabasePhotoURLTypes,
} from '@containers/profile/redux/updateDatabasePhotoURLReducer';

/**
 *  Update Database PhotoURL task
 */

export function* updateDatabasePhotoURLTask({ payload }) {
  try {
    // request user information
    const store = yield select();
    const snapshot = yield firebase.database().ref(`/users/${store.user.uid}`).once('value');
    const userData = {
      timestamp: Date.now(),
    };
    const oldUserData = yield snapshot.val();
    yield Object.assign(userData, oldUserData);
    userData.photoURL = payload.photoURL;
    yield firebase.database().ref(`/users/${store.user.uid}`).set(userData);

    yield put(UpdateDatabasePhotoURLCreators.updateDatabasePhotoURLRequestSuccess(payload.photoURL));
  } catch (error) {
    yield put(
      UpdateDatabasePhotoURLCreators.updateDatabasePhotoURLRequestFailure(
        error.message ? error.message : JSON.stringify(error),
      ),
    );
  }
}

/**
 * Loop update Database photoURL saga
 */
export function* updateDatabasePhotoURLSaga() {
  yield takeEvery(UpdateDatabasePhotoURLTypes.UPDATE_DATABASE_PHOTO_URL_REQUEST, updateDatabasePhotoURLTask);
}
