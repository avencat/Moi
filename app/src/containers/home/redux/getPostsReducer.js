import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const GetPostsTypes = {
  GET_POSTS_REQUEST: 'GET_POSTS_REQUEST',
  GET_POSTS_REQUEST_SUCCESS: 'GET_POSTS_REQUEST_SUCCESS',
  GET_POSTS_REQUEST_FAILURE: 'GET_POSTS_REQUEST_FAILURE',
};

const Types = GetPostsTypes;
export const GetPostsCreators = {
  getPostsRequest: payload => ({
    type: Types.GET_POSTS_REQUEST,
    payload,
  }),
  getPostsRequestSuccess: posts => ({
    type: Types.GET_POSTS_REQUEST_SUCCESS,
    posts,
  }),
  getPostsRequestFailure: error => ({
    type: Types.GET_POSTS_REQUEST_FAILURE,
    error,
  }),
};

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  success: false,
  posts: null,
});

/* ------------- Reducers ------------- */

const getPostsRequest = () => INITIAL_STATE.merge({ fetching: true });

const getPostsRequestSuccess = (state, { posts }) => INITIAL_STATE.merge({ success: true, posts });

const getPostsRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.GET_POSTS_REQUEST]: getPostsRequest,
  [Types.GET_POSTS_REQUEST_SUCCESS]: getPostsRequestSuccess,
  [Types.GET_POSTS_REQUEST_FAILURE]: getPostsRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
