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
  loginRequestSuccess: payload => ({
    type: Types.LOGIN_REQUEST_SUCCESS,
    payload,
  }),
  loginRequestFailure: payload => ({
    type: Types.LOGIN_REQUEST_FAILURE,
    payload,
  }),
};

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  response: null,
  error: null,
  fetching: false,
});

/* ------------- Reducers ------------- */

const loginRequest = state => state.merge({ fetching: true });

const loginRequestSuccess = (state, { response }) => state.merge({ fetching: false, error: null, response });

const loginRequestFailure = (state, { error }) => state.merge({ fetching: false, error, response: null });

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

/* ------------- Selectors ------------- */
