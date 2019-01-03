import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { put, takeEvery } from 'redux-saga/effects';
import { UserCreators } from '@redux/reducers/user';
import { PostCreators, PostTypes } from '@containers/home/redux/postReducer';
import { AddUserToDatabaseCreators } from '@containers/home/redux/addPostToDatabaseReducer';

/**
 * Auth register task
 */

export function* postTask({ payload }) {
  try {
    // request user information
    const { user } = yield firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
    yield Keychain.resetGenericPassword();
    yield AsyncStorage.setItem('@MoiAsyncStorage:touchIdEnabled', 'false');
    const userObject = yield JSON.parse(JSON.stringify(user));
    yield Object.assign(userObject, { password: payload.password });
    yield put(PostCreators.registerRequestSuccess(userObject));
    yield put(UserCreators.userSet(userObject));
    yield put(AddUserToDatabaseCreators.addUserToDatabaseRequest(userObject));
  } catch (error) {
    yield put(PostCreators.postRequestFailure(error.message ? error.message : error.code));
  }
}

/**
 * Loop register saga
 */
export function* postSaga() {
  yield takeEvery(PostTypes.POST_REQUEST, postTask);
}
