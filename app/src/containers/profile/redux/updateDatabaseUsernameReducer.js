import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const UpdateDatabaseUsernameTypes = {
  UPDATE_DATABASE_USERNAME_REQUEST: 'UPDATE_DATABASE_USERNAME_REQUEST',
  UPDATE_DATABASE_USERNAME_REQUEST_SUCCESS: 'UPDATE_DATABASE_USERNAME_REQUEST_SUCCESS',
  UPDATE_DATABASE_USERNAME_REQUEST_FAILURE: 'UPDATE_DATABASE_USERNAME_REQUEST_FAILURE',
};

const Types = UpdateDatabaseUsernameTypes;
export const UpdateDatabaseUsernameCreators = {
  updateDatabaseUsernameRequest: payload => ({
    type: Types.UPDATE_DATABASE_USERNAME_REQUEST,
    payload,
  }),
  updateDatabaseUsernameRequestSuccess: username => ({
    type: Types.UPDATE_DATABASE_USERNAME_REQUEST_SUCCESS,
    username,
  }),
  updateDatabaseUsernameRequestFailure: error => ({
    type: Types.UPDATE_DATABASE_USERNAME_REQUEST_FAILURE,
    error,
  }),
};

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  username: null,
  success: false,
});

/* ------------- Reducers ------------- */

const updateDatabaseUsernameRequest = () => INITIAL_STATE.merge({ fetching: true });

const updateDatabaseUsernameRequestSuccess = (state, { username }) => INITIAL_STATE.merge({ success: true, username });

const updateDatabaseUsernameRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.UPDATE_DATABASE_USERNAME_REQUEST]: updateDatabaseUsernameRequest,
  [Types.UPDATE_DATABASE_USERNAME_REQUEST_SUCCESS]: updateDatabaseUsernameRequestSuccess,
  [Types.UPDATE_DATABASE_USERNAME_REQUEST_FAILURE]: updateDatabaseUsernameRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
