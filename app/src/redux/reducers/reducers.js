// @flow
import { combineReducers } from 'redux';
import { reducer as auth } from '@redux/reducers/auth';
import { reducer as user } from '@redux/reducers/user';
import { reducer as login } from '@containers/login/redux/login';

export default combineReducers({
  forms: combineReducers({
    login,
  }),
  auth,
  user,
});
