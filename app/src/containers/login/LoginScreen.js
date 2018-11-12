// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import {
  Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback,
} from 'react-native';
import Button from '@components/Button';
import i18n from '@resources/translations';
import TextInput from '@components/TextInput';
import ErrorComponent from '@components/ErrorComponent';
import { LoginCreators } from '@containers/login/redux/login';
import Navigation from '@config/Navigation';

type Props = NavigationScreenProps & {
  login: {
    error?: string,
    fetching: boolean,
    success: boolean,
  },
};

type State = {
  password: string,
  username: string,
};

const mapStateToProps = state => ({
  login: state.forms.login,
});
const mapDispatchToProps = dispatch => ({
  loginRequest: payload => dispatch(LoginCreators.loginRequest(payload)),
});
class LoginScreen extends React.Component<Props, State> {
  static navigationOptions = { header: null };

  static getDerivedStateFromProps(nextProps) {
    const nextState = {};

    if (nextProps.login.error) {
      Object.assign(nextState, {
        error: i18n.t('LOGIN.FORM.ERROR'),
      });
    }
    return nextState;
  }

  state = {
    error: null,
    password: '',
    username: '',
  };

  onChangePassword = (password: string) => this.setState({ password });

  onChangeUsername = (username: string) => this.setState({ username });

  onPress = () => this.props.navigation.navigate(Navigation.APP);

  hideKeyboard = () => Keyboard.dismiss();

  render() {
    const { error, password, username } = this.state;

    return (
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={this.hideKeyboard}>
          <KeyboardAvoidingView>
            <ErrorComponent show={!!error}>{error}</ErrorComponent>
            <TextInput
              onChangeText={this.onChangeUsername}
              placeholder={i18n.t('LOGIN.FORM.USERNAME')}
              value={username}
            />
            <TextInput
              onChangeText={this.onChangePassword}
              placeholder={i18n.t('LOGIN.FORM.PASSWORD')}
              value={password}
            />
            <Button onPress={this.onPress} text={i18n.t('LOGIN.LOGIN')} />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
