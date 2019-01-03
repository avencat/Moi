import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const UpdateDatabasePhotoURLTypes = {
  UPDATE_DATABASE_PHOTO_URL_REQUEST: 'UPDATE_DATABASE_PHOTO_URL_REQUEST',
  UPDATE_DATABASE_PHOTO_URL_REQUEST_SUCCESS: 'UPDATE_DATABASE_PHOTO_URL_REQUEST_SUCCESS',
  UPDATE_DATABASE_PHOTO_URL_REQUEST_FAILURE: 'UPDATE_DATABASE_PHOTO_URL_REQUEST_FAILURE',
};

const Types = UpdateDatabasePhotoURLTypes;
export const UpdateDatabasePhotoURLCreators = {
  updateDatabasePhotoURLRequest: payload => ({
    type: Types.UPDATE_DATABASE_PHOTO_URL_REQUEST,
    payload,
  }),
  updateDatabasePhotoURLRequestSuccess: photoURL => ({
    type: Types.UPDATE_DATABASE_PHOTO_URL_REQUEST_SUCCESS,
    photoURL,
  }),
  updateDatabasePhotoURLRequestFailure: error => ({
    type: Types.UPDATE_DATABASE_PHOTO_URL_REQUEST_FAILURE,
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

const updateDatabasePhotoURLRequest = () => INITIAL_STATE.merge({ fetching: true });

const updateDatabasePhotoURLRequestSuccess = (state, { photoURL }) => INITIAL_STATE.merge({ success: true, photoURL });

const updateDatabasePhotoURLRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.UPDATE_DATABASE_PHOTO_URL_REQUEST]: updateDatabasePhotoURLRequest,
  [Types.UPDATE_DATABASE_PHOTO_URL_REQUEST_SUCCESS]: updateDatabasePhotoURLRequestSuccess,
  [Types.UPDATE_DATABASE_PHOTO_URL_REQUEST_FAILURE]: updateDatabasePhotoURLRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
