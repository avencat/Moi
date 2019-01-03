import { fork } from 'redux-saga/effects';
import { loginSaga } from '@containers/login/sagas/loginSaga';
import { logoutSaga } from '@containers/login/sagas/logoutSaga';
import { getPostsSaga } from '@containers/home/sagas/getPostsSaga';
import { registerSaga } from '@containers/login/sagas/registerSaga';
import { updateEmailSaga } from '@containers/profile/sagas/updateEmailSaga';
import { updatePasswordSaga } from '@containers/profile/sagas/updatePasswordSaga';
import { updatePhotoURLSaga } from '@containers/profile/sagas/updatePhotoURLSaga';
import { updateUsernameSaga } from '@containers/profile/sagas/updateUsernameSaga';
import { addPostToDatabaseSaga } from '@containers/home/sagas/addPostToDatabaseSaga';
import { addUserToDatabaseSaga } from '@containers/login/sagas/addUserToDatabaseSaga';
import { uploadProfilePictureSaga } from '@containers/profile/sagas/uploadProfilePictureSaga';
import { updateDatabasePhotoURLSaga } from '@containers/profile/sagas/updateDatabasePhotoURLSaga';
import { updateDatabaseUsernameSaga } from '@containers/profile/sagas/updateDatabaseUsernameSaga';

export default function* root() {
  yield fork(loginSaga);
  yield fork(logoutSaga);
  yield fork(getPostsSaga);
  yield fork(registerSaga);
  yield fork(updateEmailSaga);
  yield fork(updatePasswordSaga);
  yield fork(updatePhotoURLSaga);
  yield fork(updateUsernameSaga);
  yield fork(addUserToDatabaseSaga);
  yield fork(addPostToDatabaseSaga);
  yield fork(uploadProfilePictureSaga);
  yield fork(updateDatabasePhotoURLSaga);
  yield fork(updateDatabaseUsernameSaga);
}
