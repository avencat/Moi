// @flow
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const UserTypes = {
  USER_SET: 'USER_SET',
  USER_CLEAR: 'USER_CLEAR',
};

const Types = UserTypes;
export const UserCreators = {
  userSet: payload => ({
    type: Types.USER_SET,
    payload,
  }),
  userClear: () => ({
    type: Types.USER_CLEAR,
    payload: null,
  }),
};

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {};

/* ------------- Reducers ------------- */

const userSet = (state, { payload }) => Immutable(payload);

const userClear = () => INITIAL_STATE;


/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.USER_SET]: userSet,
  [Types.USER_CLEAR]: userClear,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
