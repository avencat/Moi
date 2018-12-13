// @flow
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import reducers from '@redux/reducers/reducers';
import sagas from '@sagas/sagas';

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware, logger),
  );

  sagaMiddleware.run(sagas);

  return store;
};
