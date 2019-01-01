// @flow
import * as React from 'react';
import { TextInput as OfficialTextInput, View } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Colors } from '@resources/themes';
import styles from './styles/TextInputStyles';

type Props = {
  ...OfficialTextInput.propTypes,
  containerStyle?: ViewStyleProp,
};

export default class TextInput extends React.PureComponent<Props> {
  static defaultProps = {
    containerStyle: {},
    underlineColorAndroid: Colors.transparent,
  };

  blur = () => this.textInput.blur();

  focus = () => this.textInput.focus();

  render() {
    const { containerStyle } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <OfficialTextInput
          {...this.props}
          ref={(ref) => { this.textInput = ref; }}
          style={[styles.defaultTextInput, this.props.style]}
        />
      </View>
    );
  }
}
