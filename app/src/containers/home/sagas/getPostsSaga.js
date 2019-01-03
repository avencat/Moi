import firebase from 'firebase';
import { put, takeEvery } from 'redux-saga/effects';
import { GetPostsCreators, GetPostsTypes } from '@containers/home/redux/getPostsReducer';

/**
 * Get Posts To Database task
 */

export function* getPostsTask() {
  try {
    const ref = yield firebase.database().ref('/posts').once('value');
    const postsValues = yield ref.val();
    const posts = Object.values(postsValues);

    yield put(GetPostsCreators.getPostsRequestSuccess(posts));
  } catch (error) {
    yield put(
      GetPostsCreators.getPostsRequestFailure(
        error.message ? error.message : JSON.stringify(error),
      ),
    );
  }
}

/**
 * Loop Get Posts To Database saga
 */
export function* getPostsSaga() {
  yield takeEvery(GetPostsTypes.GET_POSTS_REQUEST, getPostsTask);
}
