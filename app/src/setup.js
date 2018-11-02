// @flow
/**
 *
 * Setup the app
 */
import * as React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, YellowBox } from 'react-native';
import store from '@redux/store';
import MoiApp from './MoiApp';

YellowBox.ignoreWarnings([
  'Warning: Failed prop type: Invalid prop `marginBottom` supplied to `BaseLightBox`.',
]);

export default function setup() {
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
