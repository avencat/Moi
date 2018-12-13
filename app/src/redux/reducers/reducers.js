// @flow
import { combineReducers } from 'redux';
import { reducer as auth } from '@redux/reducers/auth';
import { reducer as user } from '@redux/reducers/user';
import { reducer as login } from '@containers/login/redux/loginReducer';
import { reducer as logout } from '@containers/login/redux/logoutReducer';
import { reducer as register } from '@containers/login/redux/registerReducer';

export default combineReducers({
  forms: combineReducers({
    login,
    logout,
    register,
  }),
  auth,
  user,
});
