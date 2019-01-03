import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const UpdatePasswordTypes = {
  UPDATE_PASSWORD_REQUEST: 'UPDATE_PASSWORD_REQUEST',
  UPDATE_PASSWORD_REQUEST_SUCCESS: 'UPDATE_PASSWORD_REQUEST_SUCCESS',
  UPDATE_PASSWORD_REQUEST_FAILURE: 'UPDATE_PASSWORD_REQUEST_FAILURE',
};

const Types = UpdatePasswordTypes;
export const UpdatePasswordCreators = {
  updatePasswordRequest: payload => ({
    type: Types.UPDATE_PASSWORD_REQUEST,
    payload,
  }),
  updatePasswordRequestSuccess: password => ({
    type: Types.UPDATE_PASSWORD_REQUEST_SUCCESS,
    password,
  }),
  updatePasswordRequestFailure: error => ({
    type: Types.UPDATE_PASSWORD_REQUEST_FAILURE,
    error,
  }),
};

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  password: null,
  success: false,
});

/* ------------- Reducers ------------- */

const updatePasswordRequest = () => INITIAL_STATE.merge({ fetching: true });

const updatePasswordRequestSuccess = (state, { password }) => INITIAL_STATE.merge({ success: true, password });

const updatePasswordRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.UPDATE_PASSWORD_REQUEST]: updatePasswordRequest,
  [Types.UPDATE_PASSWORD_REQUEST_SUCCESS]: updatePasswordRequestSuccess,
  [Types.UPDATE_PASSWORD_REQUEST_FAILURE]: updatePasswordRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
