// @flow
import { combineReducers } from 'redux';
import { reducer as auth } from '@redux/reducers/auth';
import { reducer as user } from '@redux/reducers/user';
import { reducer as login } from '@containers/login/redux/loginReducer';
import { reducer as logout } from '@containers/login/redux/logoutReducer';
import { reducer as register } from '@containers/login/redux/registerReducer';
import { reducer as updateEmail } from '@containers/profile/redux/updateEmailReducer';
import { reducer as updatePassword } from '@containers/profile/redux/updatePasswordReducer';
import { reducer as updatePhotoURL } from '@containers/profile/redux/updatePhotoURLReducer';
import { reducer as updateUsername } from '@containers/profile/redux/updateUsernameReducer';
import { reducer as uploadProfilePicture } from '@containers/profile/redux/uploadProfilePictureReducer';
import { reducer as updateDatabasePhotoURL } from '@containers/profile/redux/updateDatabasePhotoURLReducer';

export default combineReducers({
  forms: combineReducers({
    login,
    logout,
    register,
    updateEmail,
    updatePassword,
    updatePhotoURL,
    updateUsername,
    uploadProfilePicture,
    updateDatabasePhotoURL,
  }),
  auth,
  user,
});
