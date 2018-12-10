// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import {
  Animated, Keyboard, View, Platform, SafeAreaView, Text, TouchableWithoutFeedback,
} from 'react-native';
import Button from '@components/Button';
import i18n from '@resources/translations';
import TextInput from '@components/TextInput';
import ErrorComponent from '@components/ErrorComponent';
import { LoginCreators } from '@containers/login/redux/login';
import Navigation from '@config/Navigation';
import styles from './LoginScreenStyles';

type Props = NavigationScreenProps & {
  login: {
    error?: string,
    fetching: boolean,
    success: boolean,
  },
};

type State = {
  error: any,
  isLoading: boolean,
  marginTop: Animated.Value,
  password: string,
  email: string,
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

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: false,
      marginTop: new Animated.Value(0),
      password: '',
      email: '',
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

  onChangePassword = (password: string) => this.setState({ password });

  onChangeEmail = (email: string) => this.setState({ email });

  onPressRegister = () => {
    const { email, password } = this.state;

    if (!email || !password) {
      return;
    }

    this.setState({ isLoading: true });
  };

  onPress = () => this.setState({ isLoading: true }, () => setTimeout(() => {
    this.setState({ isLoading: false });
    this.props.navigation.navigate(Navigation.APP);
  }, 1000));

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
      error, isLoading, marginTop, password, email,
    } = this.state;

    console.log(marginTop);

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={this.hideKeyboard}>
          <View style={[styles.contentContainer, { marginTop }]}>
            <Text style={styles.title}>{i18n.t('LOGIN.TITLE')}</Text>
            <ErrorComponent show={!!error}>{error}</ErrorComponent>

            <TextInput
              onChangeText={this.onChangeEmail}
              onSubmitEditing={this.focusPassword}
              placeholder={i18n.t('LOGIN.FORM.EMAIL')}
              returnKeyType="next"
              textContentType="username"
              value={email}
            />

            <TextInput
              onChangeText={this.onChangePassword}
              onSubmitEditing={this.onPress}
              placeholder={i18n.t('LOGIN.FORM.PASSWORD')}
              ref={(ref) => { this.passwordInput = ref; }}
              returnKeyType="send"
              secureTextEntry
              textContentType="password"
              value={password}
            />

            <Button isLoading={isLoading} onPress={this.onPress} text={i18n.t('LOGIN.LOGIN')} />
            <Button
              buttonStyle={{ marginTop: -10 }}
              isLoading={isLoading}
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
