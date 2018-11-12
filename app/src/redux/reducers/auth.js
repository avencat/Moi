// @flow

import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const AuthTypes = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
};
const Types = AuthTypes;

export const AuthCreators = {
  authLogin: payload => ({
    type: Types.AUTH_LOGIN,
    payload: {
      ...payload,
      isLogged: true,
    },
  }),
  authLogout: () => ({
    type: Types.AUTH_LOGOUT,
  }),
};

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  session: null,
  token: null,
  isLogged: false,
});

/* ------------- Reducers ------------- */

const authLogin = (state, { payload }) => state.merge(payload);

const authLogout = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

const typesReducers = {
  [Types.AUTH_LOGIN]: authLogin,
  [Types.AUTH_LOGOUT]: authLogout,
};

export function reducer(state = INITIAL_STATE, action) {
  if (typesReducers[action.type]) {
    return typesReducers[action.type](state, action);
  }
  return state;
}
