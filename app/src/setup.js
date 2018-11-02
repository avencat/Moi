// @flow
/**
 *
 * Setup the app
 */
import React from 'react';
import { combineReducers } from 'redux';
import { AppRegistry, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import MoiApp from './MoiApp';

YellowBox.ignoreWarnings([
  'Warning: Failed prop type: Invalid prop `marginBottom` supplied to `BaseLightBox`.',
]);

export default function setup() {
  // create provider (will provide store to MoiApp)
  const store = combineReducers({});

  const component = () => (
    <Provider store={store}>
      <MoiApp />
    </Provider>
  );

  // Register the app
  AppRegistry.registerComponent('Moi', () => component);
  // return the component
  return component;
}
