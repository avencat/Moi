import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const PostTypes = {
  POST_REQUEST: 'POST_REQUEST',
  POST_REQUEST_SUCCESS: 'POST_REQUEST_SUCCESS',
  POST_REQUEST_FAILURE: 'POST_REQUEST_FAILURE',
};

const Types = PostTypes;
export const PostCreators = {
  registerRequest: payload => ({
    type: Types.POST_REQUEST,
    payload,
  }),
  postRequestSuccess: response => ({
    type: Types.POST_REQUEST_SUCCESS,
    response,
  }),
  postRequestFailure: error => ({
    type: Types.POST_REQUEST_FAILURE,
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

const postRequest = () => INITIAL_STATE.merge({ fetching: true });

const postRequestSuccess = (state, { response }) => INITIAL_STATE.merge({ success: true, response });

const postRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.POST_REQUEST]: postRequest,
  [Types.POST_REQUEST_SUCCESS]: postRequestSuccess,
  [Types.POST_REQUEST_FAILURE]: postRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
