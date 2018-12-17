import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const AddUserToDatabaseTypes = {
  ADD_USER_TO_DATABASE_REQUEST: 'ADD_USER_TO_DATABASE_REQUEST',
  ADD_USER_TO_DATABASE_REQUEST_SUCCESS: 'ADD_USER_TO_DATABASE_REQUEST_SUCCESS',
  ADD_USER_TO_DATABASE_REQUEST_FAILURE: 'ADD_USER_TO_DATABASE_REQUEST_FAILURE',
};

const Types = AddUserToDatabaseTypes;
export const AddUserToDatabaseCreators = {
  addUserToDatabaseRequest: payload => ({
    type: Types.ADD_USER_TO_DATABASE_REQUEST,
    payload,
  }),
  addUserToDatabaseRequestSuccess: user => ({
    type: Types.ADD_USER_TO_DATABASE_REQUEST_SUCCESS,
    user,
  }),
  addUserToDatabaseRequestFailure: error => ({
    type: Types.ADD_USER_TO_DATABASE_REQUEST_FAILURE,
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

const addUserToDatabaseRequest = () => INITIAL_STATE.merge({ fetching: true });

const addUserToDatabaseRequestSuccess = (state, { user }) => INITIAL_STATE.merge({ success: true, user });

const addUserToDatabaseRequestFailure = (state, { error }) => INITIAL_STATE.merge({ error });

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.ADD_USER_TO_DATABASE_REQUEST]: addUserToDatabaseRequest,
  [Types.ADD_USER_TO_DATABASE_REQUEST_SUCCESS]: addUserToDatabaseRequestSuccess,
  [Types.ADD_USER_TO_DATABASE_REQUEST_FAILURE]: addUserToDatabaseRequestFailure,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
