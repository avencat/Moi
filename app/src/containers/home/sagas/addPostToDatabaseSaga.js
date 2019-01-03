import firebase from 'firebase';
import { put, takeEvery } from 'redux-saga/effects';
import { AddPostToDatabaseCreators, AddPostToDatabaseTypes } from '@containers/home/redux/addPostToDatabaseReducer';

/**
 * Auth Add User To Database task
 */

export function* authAddPostToDatabaseTask({ payload }) {
  try {
    // request post information
    const userPost = {
      id: Date.now() + payload.username,
      content: payload.postContent,
      timestamp: Date.now(),
      userId: payload.userId,
    };
    yield firebase.database().ref(`/post/${payload.uid}`).set(userPost);

    yield put(AddPostToDatabaseCreators.addPostToDatabaseRequestSuccess(payload));
  } catch (error) {
    yield put(
      AddPostToDatabaseCreators.addPostToDatabaseRequestFailure(
        error.message ? error.message : JSON.stringify(error),
      ),
    );
  }
}

/**
 * Loop Add User To Database saga
 */
export function* addPostToDatabaseSaga() {
  yield takeEvery(AddPostToDatabaseTypes.ADD_POST_TO_DATABASE_REQUEST, authAddPostToDatabaseTask);
}
