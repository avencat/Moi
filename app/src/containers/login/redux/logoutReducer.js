import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const LogoutTypes = {
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_REQUEST_SUCCESS: 'LOGOUT_REQUEST_SUCCESS',
  LOGOUT_REQUEST_FAILURE: 'LOGOUT_REQUEST_FAILURE',
};

const Types = LogoutTypes;
export const LogoutCreators = {
  logoutRequest: () => ({
    type: Types.LOGOUT_REQUEST,
  }),
  logoutRequestSuccess: response => ({
    type: Types.LOGOUT_REQUEST_SUCCESS,
    response,
  }),
  logoutRequestFailure: error => ({
    type: Types.LOGOUT_REQUEST_FAILURE,
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

const logoutRequest = () => INITIAL_STATE;

const logoutRequestSuccess = (state, { response }) => INITIAL_STATE.merge({ success: true, response });

const logoutRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_REQUEST_SUCCESS]: logoutRequestSuccess,
  [Types.LOGOUT_REQUEST_FAILURE]: logoutRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
