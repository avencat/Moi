import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const UpdateUsernameTypes = {
  UPDATE_USERNAME_REQUEST: 'UPDATE_USERNAME_REQUEST',
  UPDATE_USERNAME_REQUEST_SUCCESS: 'UPDATE_USERNAME_REQUEST_SUCCESS',
  UPDATE_USERNAME_REQUEST_FAILURE: 'UPDATE_USERNAME_REQUEST_FAILURE',
};

const Types = UpdateUsernameTypes;
export const UpdateUsernameCreators = {
  updateUsernameRequest: payload => ({
    type: Types.UPDATE_USERNAME_REQUEST,
    payload,
  }),
  updateUsernameRequestSuccess: username => ({
    type: Types.UPDATE_USERNAME_REQUEST_SUCCESS,
    username,
  }),
  updateUsernameRequestFailure: error => ({
    type: Types.UPDATE_USERNAME_REQUEST_FAILURE,
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

const updateUsernameRequest = () => INITIAL_STATE.merge({ fetching: true });

const updateUsernameRequestSuccess = (state, { username }) => INITIAL_STATE.merge({ success: true, username });

const updateUsernameRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.UPDATE_USERNAME_REQUEST]: updateUsernameRequest,
  [Types.UPDATE_USERNAME_REQUEST_SUCCESS]: updateUsernameRequestSuccess,
  [Types.UPDATE_USERNAME_REQUEST_FAILURE]: updateUsernameRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
