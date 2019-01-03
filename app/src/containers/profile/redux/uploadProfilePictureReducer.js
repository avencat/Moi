import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const UploadProfilePictureTypes = {
  UPLOAD_PROFILE_PICTURE_REQUEST: 'UPLOAD_PROFILE_PICTURE_REQUEST',
  UPLOAD_PROFILE_PICTURE_REQUEST_SUCCESS: 'UPLOAD_PROFILE_PICTURE_REQUEST_SUCCESS',
  UPLOAD_PROFILE_PICTURE_REQUEST_FAILURE: 'UPLOAD_PROFILE_PICTURE_REQUEST_FAILURE',
};

const Types = UploadProfilePictureTypes;
export const UploadProfilePictureCreators = {
  uploadProfilePictureRequest: payload => ({
    type: Types.UPLOAD_PROFILE_PICTURE_REQUEST,
    payload,
  }),
  uploadProfilePictureRequestSuccess: photoURL => ({
    type: Types.UPLOAD_PROFILE_PICTURE_REQUEST_SUCCESS,
    photoURL,
  }),
  uploadProfilePictureRequestFailure: error => ({
    type: Types.UPLOAD_PROFILE_PICTURE_REQUEST_FAILURE,
    error,
  }),
};

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  photoURL: null,
  success: false,
});

/* ------------- Reducers ------------- */

const uploadProfilePictureRequest = () => INITIAL_STATE.merge({ fetching: true });

const uploadProfilePictureRequestSuccess = (state, { photoURL }) => INITIAL_STATE.merge({
  success: true,
  photoURL,
});

const uploadProfilePictureRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.UPLOAD_PROFILE_PICTURE_REQUEST]: uploadProfilePictureRequest,
  [Types.UPLOAD_PROFILE_PICTURE_REQUEST_SUCCESS]: uploadProfilePictureRequestSuccess,
  [Types.UPLOAD_PROFILE_PICTURE_REQUEST_FAILURE]: uploadProfilePictureRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
