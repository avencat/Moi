// @flow
import * as React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import TouchID from 'react-native-touch-id';
import { Icon } from 'react-native-elements';
import * as Keychain from 'react-native-keychain';
import { NavigationScreenProps } from 'react-navigation';
import {
  Animated, AsyncStorage, Keyboard, Platform, SafeAreaView, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import Button from '@components/Button';
import { Colors } from '@resources/themes';
import i18n from '@resources/translations';
import Navigation from '@config/Navigation';
import TextInput from '@components/TextInput';
import Touchable from '@components/Touchable';
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
  touchIdCompatible: boolean,
  touchIdEnabled: boolean,
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
        && !nextProps.register.fetching
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
      touchIdCompatible: false,
      touchIdEnabled: false,
    };
  }

  componentDidMount() {
    /* global __DEV__ */
    if (__DEV__ && firebase.auth().currentUser) {
      this.props.navigation.navigate(Navigation.APP);
    }

    Platform.select({
      android: () => {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
      },
      ios: () => {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
      },
    })();

    this.getTouchIdStatus();
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

  getTouchIdStatus = async () => {
    let touchIdCompatible = false;
    try {
      const touchIdString = await TouchID.isSupported();
      if (touchIdString) {
        touchIdCompatible = true;
      }
    } catch (err) {} // eslint-disable-line
    const touchIdEnabled = await AsyncStorage.getItem('@MoiAsyncStorage:touchIdEnabled');
    this.setState({ touchIdCompatible, touchIdEnabled: touchIdEnabled === 'true' });

    if (touchIdCompatible && touchIdEnabled === 'true' && !__DEV__) {
      this.presentTouchId();
    }
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

  presentTouchId = () => {
    Keychain
      .getGenericPassword()
      .then(({ username, password }) => {
        TouchID.authenticate(`${i18n.t('LOGIN.TOUCH_ID_LOGIN')} "${username}"`, {
          fallbackLabel: i18n.t('LOGIN.TOUCH_ID_CANCEL'),
        })
          .then((success) => {
            if (success) {
              this.setState({ email: '*********@****.***', password: '***************' });
              this.props.loginRequest({ email: username, password });
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  render() {
    const {
      email, error, isLoginLoading, isRegisterLoading, marginTop, password, touchIdCompatible, touchIdEnabled,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={this.hideKeyboard}>
          <Animated.View style={[styles.contentContainer, { marginTop }]}>
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
              onSubmitEditing={this.onPressLogin}
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

            {touchIdCompatible && touchIdEnabled && (
              <Touchable onPress={this.presentTouchId}>
                <View style={styles.fingerprint}>
                  <Icon color={Colors.white} name="fingerprint" />
                </View>
              </Touchable>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
