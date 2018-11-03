// @flow
/**
 *
 * The root element
 */
import * as React from 'react';
import RNLanguages from 'react-native-languages';
import { Platform, Text, View } from 'react-native';
import i18n from '@resources/translations';
import styles from './MoiAppStyles';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

export default class MoiApp extends React.PureComponent {
  componentDidMount() {
    RNLanguages.addEventListener('change', this.onLanguagesChange);
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this.onLanguagesChange);
  }

  onLanguagesChange = ({ language }) => {
    i18n.locale = language;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}
