// @flow
import * as React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import type { TextStyleProp, ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Colors } from '@resources/themes';
import Touchable from '@components/Touchable';
import styles from './styles/ButtonStyles';

type Props = {
  buttonStyle?: ViewStyleProp,
  buttonTextStyle?: TextStyleProp,
  isLoading?: boolean,
  onPress: Function,
  text: string,
};

export default class Button extends React.PureComponent<Props> {
  static defaultProps = {
    buttonStyle: null,
    buttonTextStyle: null,
    isLoading: false,
  };

  render() {
    const {
      buttonStyle, buttonTextStyle, isLoading, onPress, text,
    } = this.props;

    return (
      <Touchable onPress={onPress} style={[styles.button, buttonStyle]}>
        {isLoading
          ? (
            <ActivityIndicator
              animating
              size="small"
              color={Colors.white}
            />
          )
          : <Text style={[styles.text, buttonTextStyle]}>{text}</Text>}
      </Touchable>
    );
  }
}
