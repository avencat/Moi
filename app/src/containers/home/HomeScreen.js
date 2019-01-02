// @flow
import * as React from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import DrawerButton from '@components/DrawerButton';
import styles from './HomeScreenStyles';

type Props = NavigationScreenProps & {};

export default class HomeScreen extends React.PureComponent<Props> {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton openDrawer={navigation.openDrawer} />,
  });

  render() {
    return (
      <View style={styles.container} />
    );
  }
}