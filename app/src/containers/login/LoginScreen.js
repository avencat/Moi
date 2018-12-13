// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import {
  Animated, Keyboard, View, Platform, SafeAreaView, Text, TouchableWithoutFeedback,
} from 'react-native';
import Button from '@components/Button';
import i18n from '@resources/translations';
import Navigation from '@config/Navigation';
import TextInput from '@components/TextInput';
import ErrorComponent from '@components/ErrorComponent';
import { LoginCreators } from '@containers/login/redux/loginReducer';
import { RegisterCreators } from '@containers/login/redux/registerReducer';
import styles from './LoginScreenStyles';

type Props = NavigationScreenProps & {
  login: {
    error?: string,
    fetching: boolean,
    success: boolean,
  },
  loginRequest: Function,
  register: {
    error?: string,
    fetching: boolean,
    success: boolean,
  },
  registerRequest: Function,
};

type State = {
  error: any,
  isLoginLoading: boolean,
  isRegisterLoading: boolean,
  marginTop: Animated.Value,
  password: string,
  email: string,
};

const mapStateToProps = state => ({
  login: state.forms.login,
  register: state.forms.register,
});
const mapDispatchToProps = dispatch => ({
  loginRequest: payload => dispatch(LoginCreators.loginRequest(payload)),
  registerRequest: payload => dispatch(RegisterCreators.registerRequest(payload)),
});
class LoginScreen extends React.Component<Props, State> {
  static navigationOptions = { header: null };

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {
      isLoginLoading: nextProps.login.fetching,
      isRegisterLoading: nextProps.register.fetching,
    };

    if (
      (nextProps.login.success
        && !nextProps.login.fetching
        && prevState.isLoginLoading)
      || (nextProps.register.success
        && !nextProps.login.fetching
        && prevState.isRegisterLoading)
    ) {
      nextProps.navigation.navigate(Navigation.APP);
    } else if (prevState.isLoginLoading && nextProps.login.error) {
      Object.assign(nextState, {
        error: nextProps.login.error,
      });
    } else if (prevState.isRegisterLoading && nextProps.register.error) {
      Object.assign(nextState, {
        error: nextProps.register.error,
      });
    }

    return nextState;
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: null,
      isLoginLoading: false,
      isRegisterLoading: false,
      marginTop: new Animated.Value(0),
      password: '',
    };
  }

  componentDidMount() {
    Platform.select({
      android: () => {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
      },
      ios: () => {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
      },
    });
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  onChangeEmail = (email: string) => this.setState({ email, error: null });

  onChangePassword = (password: string) => this.setState({ password, error: null });

  onPressRegister = () => {
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: i18n.t('LOGIN.FORM.ERROR.FILL_ALL') });
      return;
    }

    this.props.registerRequest({ email, password });
  };

  onPressLogin = () => {
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: i18n.t('LOGIN.FORM.ERROR.FILL_ALL') });
      return;
    }

    this.props.loginRequest({ email, password });
  };

  focusPassword = () => this.passwordInput.focus();

  hideKeyboard = () => Keyboard.dismiss();

  keyboardWillHide = () => {
    Animated.timing(this.state.marginTop, {
      duration: 100,
      toValue: 0,
    }).start();
  };

  keyboardWillShow = () => {
    Animated.timing(this.state.marginTop, {
      duration: 100,
      toValue: -50,
    }).start();
  };

  render() {
    const {
      error, isLoginLoading, isRegisterLoading, marginTop, password, email,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={this.hideKeyboard}>
          <View style={[styles.contentContainer, { marginTop }]}>
            <Text style={styles.title}>{i18n.t('LOGIN.TITLE')}</Text>
            <ErrorComponent show={!!error}>{error}</ErrorComponent>

            <TextInput
              autoCapitalize="none"
              onChangeText={this.onChangeEmail}
              onSubmitEditing={this.focusPassword}
              placeholder={i18n.t('LOGIN.FORM.EMAIL')}
              returnKeyType="next"
              textContentType="username"
              value={email}
            />

            <TextInput
              autoCapitalize="none"
              onChangeText={this.onChangePassword}
              onSubmitEditing={this.onPress}
              placeholder={i18n.t('LOGIN.FORM.PASSWORD')}
              ref={(ref) => { this.passwordInput = ref; }}
              returnKeyType="send"
              secureTextEntry
              textContentType="password"
              value={password}
            />

            <Button
              isDisabled={isRegisterLoading}
              isLoading={isLoginLoading}
              onPress={this.onPressLogin}
              text={i18n.t('LOGIN.LOGIN')}
            />

            <Button
              buttonStyle={{ marginTop: -10 }}
              isDisabled={isLoginLoading}
              isLoading={isRegisterLoading}
              onPress={this.onPressRegister}
              text={i18n.t('LOGIN.REGISTER')}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
