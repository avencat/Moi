import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const LoginTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS',
  LOGIN_REQUEST_FAILURE: 'LOGIN_REQUEST_FAILURE',
};

const Types = LoginTypes;
export const LoginCreators = {
  loginRequest: payload => ({
    type: Types.LOGIN_REQUEST,
    payload,
  }),
  loginRequestSuccess: response => ({
    type: Types.LOGIN_REQUEST_SUCCESS,
    response,
  }),
  loginRequestFailure: error => ({
    type: Types.LOGIN_REQUEST_FAILURE,
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

const loginRequest = () => INITIAL_STATE.merge({ fetching: true });

const loginRequestSuccess = (state, { response }) => INITIAL_STATE.merge({ success: true, response });

const loginRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_REQUEST_SUCCESS]: loginRequestSuccess,
  [Types.LOGIN_REQUEST_FAILURE]: loginRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
