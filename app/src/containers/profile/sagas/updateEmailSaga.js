// @flow
import firebase from 'firebase';
import { put, select, takeEvery } from 'redux-saga/effects';
import { UserCreators } from '@redux/reducers/user';
import { UpdateEmailCreators, UpdateEmailTypes } from '@containers/profile/redux/updateEmailReducer';

/**
 *  Update Email task
 */

export function* updateEmailTask({ payload }) {
  try {
    // request user information
    const store = yield select();
    const user = {};
    yield Object.assign(user, store.user);
    yield firebase.auth().currentUser.updateEmail(payload.email);

    yield put(UpdateEmailCreators.updateEmailRequestSuccess(payload.email));
    yield Object.assign(user, { email: payload.email });
    yield put(UserCreators.userSet(user));
  } catch (error) {
    yield put(UpdateEmailCreators.updateEmailRequestFailure(error.message ? error.message : JSON.stringify(error)));
  }
}

/**
 * Loop update email saga
 */
export function* updateEmailSaga() {
  yield takeEvery(UpdateEmailTypes.UPDATE_EMAIL_REQUEST, updateEmailTask);
}
