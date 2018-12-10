// @flow
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { DrawerItems, NavigationScreenProps } from 'react-navigation';
import Button from '@components/Button';
import Navigation from '@config/Navigation';

type Props = NavigationScreenProps & {};

export default class DrawerContent extends React.PureComponent<Props> {
  logout = () => this.props.navigation.navigate(Navigation.LOGIN);

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <DrawerItems {...this.props} />
        <Button
          text="Logout"
          onPress={this.logout}
        />
      </SafeAreaView>
    );
  }
}
