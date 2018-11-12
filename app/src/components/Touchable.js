// @flow
import * as React from 'react';
import {
  Platform, TouchableNativeFeedback, TouchableOpacity, View,
} from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  children: React.Node,
  onPress: Function,
  style?: ViewStyleProp,
};

export default class extends React.PureComponent<Props> {
  static defaultProps = {
    style: null,
  };

  render() {
    const {
      children, onPress, style,
    } = this.props;
    const Touchable = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <Touchable onPress={onPress} style={Platform.OS !== 'android' ? style : null}>
        <View style={Platform.OS === 'android' ? style : null}>
          {children}
        </View>
      </Touchable>
    );
  }
}
