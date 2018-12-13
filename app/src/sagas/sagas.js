import { fork } from 'redux-saga/effects';
import { loginSaga } from '@containers/login/sagas/loginSaga';
import { logoutSaga } from '@containers/login/sagas/logoutSaga';
import { registerSaga } from '@containers/login/sagas/registerSaga';

export default function* root() {
  yield fork(loginSaga);
  yield fork(logoutSaga);
  yield fork(registerSaga);
}
