// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { DrawerItems, NavigationScreenProps } from 'react-navigation';
import Button from '@components/Button';
import i18n from '@resources/translations';
import Navigation from '@config/Navigation';
import { LogoutCreators } from '@containers/login/redux/logoutReducer';
import styles from './DrawerContentStyles';

type Props = NavigationScreenProps & {
  logoutRequest: Function,
};

const mapDispatchToProps = dispatch => ({
  logoutRequest: () => dispatch(LogoutCreators.logoutRequest()),
});

class DrawerContent extends React.PureComponent<Props> {
  logout = () => {
    this.props.navigation.navigate(Navigation.LOGIN);
    this.props.logoutRequest();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <DrawerItems {...this.props} />
        <Button
          buttonStyle={styles.logoutButton}
          text={i18n.t('DRAWER.LOGOUT')}
          onPress={this.logout}
        />
      </SafeAreaView>
    );
  }
}

export default connect(null, mapDispatchToProps)(DrawerContent);
