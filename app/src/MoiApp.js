// @flow
/**
 *
 * The root element
 */
import * as React from 'react';
import RNLanguages from 'react-native-languages';
import RootStack from '@config/RootStack';
import i18n from '@resources/translations';

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
    return (<RootStack />);
  }
}
