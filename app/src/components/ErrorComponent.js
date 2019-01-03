// @flow
import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './styles/ErrorComponentStyles';

type Props = {
  children: React.Node,
  show?: boolean,
};

export default class ErrorComponent extends React.PureComponent<Props> {
  static defaultProps = {
    show: true,
  };

  render() {
    const { children, show } = this.props;

    if (!show) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {children}
        </Text>
      </View>
    );
  }
}
