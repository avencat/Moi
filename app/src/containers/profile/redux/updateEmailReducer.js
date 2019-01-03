import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const UpdateEmailTypes = {
  UPDATE_EMAIL_REQUEST: 'UPDATE_EMAIL_REQUEST',
  UPDATE_EMAIL_REQUEST_SUCCESS: 'UPDATE_EMAIL_REQUEST_SUCCESS',
  UPDATE_EMAIL_REQUEST_FAILURE: 'UPDATE_EMAIL_REQUEST_FAILURE',
};

const Types = UpdateEmailTypes;
export const UpdateEmailCreators = {
  updateEmailRequest: payload => ({
    type: Types.UPDATE_EMAIL_REQUEST,
    payload,
  }),
  updateEmailRequestSuccess: email => ({
    type: Types.UPDATE_EMAIL_REQUEST_SUCCESS,
    email,
  }),
  updateEmailRequestFailure: error => ({
    type: Types.UPDATE_EMAIL_REQUEST_FAILURE,
    error,
  }),
};

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  email: null,
  success: false,
});

/* ------------- Reducers ------------- */

const updateEmailRequest = () => INITIAL_STATE.merge({ fetching: true });

const updateEmailRequestSuccess = (state, { email }) => INITIAL_STATE.merge({ success: true, email });

const updateEmailRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.UPDATE_EMAIL_REQUEST]: updateEmailRequest,
  [Types.UPDATE_EMAIL_REQUEST_SUCCESS]: updateEmailRequestSuccess,
  [Types.UPDATE_EMAIL_REQUEST_FAILURE]: updateEmailRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
