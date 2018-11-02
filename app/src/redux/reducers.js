// @flow
import { combineReducers } from 'redux';
import { reducer as user } from '@redux/user-redux';

export default combineReducers({
  user,
});
