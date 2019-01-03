import firebase from 'firebase';
import { put, select, takeEvery } from 'redux-saga/effects';
import { AddPostToDatabaseCreators, AddPostToDatabaseTypes } from '@containers/home/redux/addPostToDatabaseReducer';

/**
 * Add Post To Database task
 */

export function* addPostToDatabaseTask({ payload }) {
  try {
    // request post information
    const store = yield select();
    const { user } = store;
    const timestamp = yield Date.now();

    const ref = yield firebase.database().ref('/posts');
    const newChildRef = yield ref.push();

    const userPost = {
      id: newChildRef.key,
      content: payload.postContent,
      timestamp,
      user: {
        uid: user.uid,
        username: user.displayName || user.email,
        photoURL: user.photoURL,
      },
    };
    yield newChildRef.set(userPost);

    yield put(AddPostToDatabaseCreators.addPostToDatabaseRequestSuccess(userPost));
  } catch (error) {
    yield put(
      AddPostToDatabaseCreators.addPostToDatabaseRequestFailure(
        error.message ? error.message : JSON.stringify(error),
      ),
    );
  }
}

/**
 * Loop Add Post To Database saga
 */
export function* addPostToDatabaseSaga() {
  yield takeEvery(AddPostToDatabaseTypes.ADD_POST_TO_DATABASE_REQUEST, addPostToDatabaseTask);
}
