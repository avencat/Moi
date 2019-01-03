import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const RegisterTypes = {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_REQUEST_SUCCESS: 'REGISTER_REQUEST_SUCCESS',
  REGISTER_REQUEST_FAILURE: 'REGISTER_REQUEST_FAILURE',
};

const Types = RegisterTypes;
export const RegisterCreators = {
  registerRequest: payload => ({
    type: Types.REGISTER_REQUEST,
    payload,
  }),
  registerRequestSuccess: response => ({
    type: Types.REGISTER_REQUEST_SUCCESS,
    response,
  }),
  registerRequestFailure: error => ({
    type: Types.REGISTER_REQUEST_FAILURE,
    error,
  }),
};

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  response: null,
  success: false,
});

/* ------------- Reducers ------------- */

const registerRequest = () => INITIAL_STATE.merge({ fetching: true });

const registerRequestSuccess = (state, { response }) => INITIAL_STATE.merge({ success: true, response });

const registerRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.REGISTER_REQUEST]: registerRequest,
  [Types.REGISTER_REQUEST_SUCCESS]: registerRequestSuccess,
  [Types.REGISTER_REQUEST_FAILURE]: registerRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
