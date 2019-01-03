import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const AddPostToDatabaseTypes = {
  ADD_POST_TO_DATABASE_REQUEST: 'ADD_POST_TO_DATABASE_REQUEST',
  ADD_POST_TO_DATABASE_REQUEST_SUCCESS: 'ADD_POST_TO_DATABASE_REQUEST_SUCCESS',
  ADD_POST_TO_DATABASE_REQUEST_FAILURE: 'ADD_POST_TO_DATABASE_REQUEST_FAILURE',
};

const Types = AddPostToDatabaseTypes;
export const AddPostToDatabaseCreators = {
  addPostToDatabaseRequest: payload => ({
    type: Types.ADD_POST_TO_DATABASE_REQUEST,
    payload,
  }),
  addPostToDatabaseRequestSuccess: post => ({
    type: Types.ADD_POST_TO_DATABASE_REQUEST_SUCCESS,
    post,
  }),
  addPostToDatabaseRequestFailure: error => ({
    type: Types.ADD_POST_TO_DATABASE_REQUEST_FAILURE,
    error,
  }),
};

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  success: false,
  user: null,
});

/* ------------- Reducers ------------- */

const addPostToDatabaseRequest = () => INITIAL_STATE.merge({ fetching: true });

const addPostToDatabaseRequestSuccess = (state, { post }) => INITIAL_STATE.merge({ success: true, post });

const addPostToDatabaseRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.ADD_POST_TO_DATABASE_REQUEST]: addPostToDatabaseRequest,
  [Types.ADD_POST_TO_DATABASE_REQUEST_SUCCESS]: addPostToDatabaseRequestSuccess,
  [Types.ADD_POST_TO_DATABASE_REQUEST_FAILURE]: addPostToDatabaseRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
