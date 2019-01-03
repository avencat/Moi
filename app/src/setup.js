// @flow
/**
 *
 * Setup the app
 */
/* eslint-disable import/first */
require('@config/Polyfill.js'); // eslint-disable-line
import firebase from 'firebase'; // eslint-disable-line
import * as React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, YellowBox } from 'react-native';
import StoreSetup from '@redux/store';
import Firebase from '@config/Firebase';
import MoiApp from './MoiApp';

YellowBox.ignoreWarnings([
  'Setting a timer',
]);

export default function setup() {
  try {
    Firebase();
  } catch (e) {
    console.info(e); // eslint-disable-line
  }

  const store = StoreSetup();

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
