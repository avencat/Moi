// @flow
import firebase from 'firebase';
import { put, select, takeEvery } from 'redux-saga/effects';
import { UserCreators } from '@redux/reducers/user';
import { UpdateDatabasePhotoURLCreators } from '@containers/profile/redux/updateDatabasePhotoURLReducer';
import { UpdatePhotoURLCreators, UpdatePhotoURLTypes } from '@containers/profile/redux/updatePhotoURLReducer';

/**
 *  Update PhotoURL task
 */

export function* updatePhotoURLTask({ payload }) {
  try {
    // request user information
    const store = yield select();
    const user = {};
    yield Object.assign(user, store.user);
    yield firebase.auth().currentUser.updateProfile({ photoURL: payload.photoURL });

    yield put(UpdatePhotoURLCreators.updatePhotoURLRequestSuccess(payload.photoURL));
    yield Object.assign(user, { photoURL: payload.photoURL });
    yield put(UserCreators.userSet(user));
    yield put(UpdateDatabasePhotoURLCreators.updateDatabasePhotoURLRequest({ photoURL: payload.photoURL }));
  } catch (error) {
    yield put(
      UpdatePhotoURLCreators.updatePhotoURLRequestFailure(error.message ? error.message : JSON.stringify(error)),
    );
  }
}

/**
 * Loop update photoURL saga
 */
export function* updatePhotoURLSaga() {
  yield takeEvery(UpdatePhotoURLTypes.UPDATE_PHOTO_URL_REQUEST, updatePhotoURLTask);
}
