// @flow
import { combineReducers } from 'redux';
import { reducer as user } from '@redux/reducers/user';
import { reducer as login } from '@containers/login/redux/loginReducer';
import { reducer as logout } from '@containers/login/redux/logoutReducer';
import { reducer as register } from '@containers/login/redux/registerReducer';
import { reducer as updateEmail } from '@containers/profile/redux/updateEmailReducer';
import { reducer as updatePassword } from '@containers/profile/redux/updatePasswordReducer';
import { reducer as updatePhotoURL } from '@containers/profile/redux/updatePhotoURLReducer';
import { reducer as updateUsername } from '@containers/profile/redux/updateUsernameReducer';
import { reducer as addUserToDatabase } from '@containers/login/redux/addUserToDatabaseReducer';
import { reducer as uploadProfilePicture } from '@containers/profile/redux/uploadProfilePictureReducer';
import { reducer as updateDatabasePhotoURL } from '@containers/profile/redux/updateDatabasePhotoURLReducer';
import { reducer as updateDatabaseUsername } from '@containers/profile/redux/updateDatabaseUsernameReducer';

export default combineReducers({
  forms: combineReducers({
    login,
    logout,
    register,
    updateEmail,
    updatePassword,
    updatePhotoURL,
    updateUsername,
    addUserToDatabase,
    uploadProfilePicture,
    updateDatabasePhotoURL,
    updateDatabaseUsername,
  }),
  user,
});
