import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const UpdatePhotoURLTypes = {
  UPDATE_PHOTO_URL_REQUEST: 'UPDATE_PHOTO_URL_REQUEST',
  UPDATE_PHOTO_URL_REQUEST_SUCCESS: 'UPDATE_PHOTO_URL_REQUEST_SUCCESS',
  UPDATE_PHOTO_URL_REQUEST_FAILURE: 'UPDATE_PHOTO_URL_REQUEST_FAILURE',
};

const Types = UpdatePhotoURLTypes;
export const UpdatePhotoURLCreators = {
  updatePhotoURLRequest: payload => ({
    type: Types.UPDATE_PHOTO_URL_REQUEST,
    payload,
  }),
  updatePhotoURLRequestSuccess: photoURL => ({
    type: Types.UPDATE_PHOTO_URL_REQUEST_SUCCESS,
    photoURL,
  }),
  updatePhotoURLRequestFailure: error => ({
    type: Types.UPDATE_PHOTO_URL_REQUEST_FAILURE,
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

const updatePhotoURLRequest = () => INITIAL_STATE.merge({ fetching: true });

const updatePhotoURLRequestSuccess = (state, { photoURL }) => INITIAL_STATE.merge({ success: true, photoURL });

const updatePhotoURLRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.UPDATE_PHOTO_URL_REQUEST]: updatePhotoURLRequest,
  [Types.UPDATE_PHOTO_URL_REQUEST_SUCCESS]: updatePhotoURLRequestSuccess,
  [Types.UPDATE_PHOTO_URL_REQUEST_FAILURE]: updatePhotoURLRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
