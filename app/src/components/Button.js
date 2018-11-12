// @flow
import * as React from 'react';
import { Text } from 'react-native';
import type { TextStyleProp, ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import Touchable from '@components/Touchable';
import styles from './styles/ButtonStyles';

type Props = {
  buttonStyle?: ViewStyleProp,
  buttonTextStyle?: TextStyleProp,
  onPress: Function,
  text: string,
};

export default class Button extends React.PureComponent<Props> {
  static defaultProps = {
    buttonStyle: null,
    buttonTextStyle: null,
  };

  render() {
    const {
      buttonStyle, buttonTextStyle, onPress, text,
    } = this.props;

    return (
      <Touchable onPress={onPress} style={[styles.button, buttonStyle]}>
        <Text style={[styles.text, buttonTextStyle]}>{text}</Text>
      </Touchable>
    );
  }
}
