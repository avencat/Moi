// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import {
  ActivityIndicator, Image, Keyboard, Modal, SafeAreaView, ScrollView, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import Button from '@components/Button';
import i18n from '@resources/translations';
import TextInput from '@components/TextInput';
import Touchable from '@components/Touchable';
import DrawerButton from '@components/DrawerButton';
import ErrorComponent from '@components/ErrorComponent';
import AbstractImageUpload from '@components/AbstractImageUpload';
import { UpdateEmailCreators } from '@containers/profile/redux/updateEmailReducer';
import { UpdatePasswordCreators } from '@containers/profile/redux/updatePasswordReducer';
import { UpdatePhotoURLCreators } from '@containers/profile/redux/updatePhotoURLReducer';
import { UpdateUsernameCreators } from '@containers/profile/redux/updateUsernameReducer';
import { UploadProfilePictureCreators } from '@containers/profile/redux/uploadProfilePictureReducer';
import styles from './ProfileScreenStyles';

type Props = NavigationScreenProps & {
  updateEmailRequest: Function,
  updatePasswordRequest: Function,
  updatePhotoURLRequest: Function,
  updateUsernameRequest: Function,
  uploadProfilePictureRequest: Function,
  user: {
    displayName?: string,
    email: string,
    password: string,
    photoURL?: string,
  },
};
type State = {
  currentPassword: string,
  email: string,
  errorInformations?: string,
  errorPassword?: string,
  errorPictures?: string,
  isEmailUpdateLoading: boolean,
  isPasswordChangeLoading: boolean,
  isPhotoURLUpdateLoading: boolean,
  isProfilePictureUploading: boolean,
  isUsernameUpdateLoading: boolean,
  name: string,
  password: string,
  passwordConfirmation: string,
  showPictureModal: boolean,
};

const mapStateToProps = state => ({
  user: state.user,
  updateEmail: state.forms.updateEmail,
  updatePassword: state.forms.updatePassword,
  updatePhotoURL: state.forms.updatePhotoURL,
  updateUsername: state.forms.updateUsername,
  uploadProfilePicture: state.forms.uploadProfilePicture,
});
const mapDispatchToProps = dispatch => ({
  updateEmailRequest: payload => dispatch(UpdateEmailCreators.updateEmailRequest(payload)),
  updatePasswordRequest: payload => dispatch(UpdatePasswordCreators.updatePasswordRequest(payload)),
  updatePhotoURLRequest: payload => dispatch(UpdatePhotoURLCreators.updatePhotoURLRequest(payload)),
  updateUsernameRequest: payload => dispatch(UpdateUsernameCreators.updateUsernameRequest(payload)),
  uploadProfilePictureRequest: payload => dispatch(UploadProfilePictureCreators.uploadProfilePictureRequest(payload)),
});
class ProfileScreen extends AbstractImageUpload<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton openDrawer={navigation.openDrawer} />,
    title: i18n.t('PROFILE.TITLE'),
  });

  libraryOptions = {
    cropping: true,
    height: 512,
    width: 512,
  };

  compressOptions = {
    enable: true,
    maxSize: 1000000,
    maxWidth: 512,
    authorizeIOSCompression: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {
      isEmailUpdateLoading: nextProps.updateEmail.fetching,
      isPasswordChangeLoading: nextProps.updatePassword.fetching,
      isPhotoURLUpdateLoading: nextProps.updatePhotoURL.fetching,
      isProfilePictureUploading: nextProps.uploadProfilePicture.fetching,
      isUsernameUpdateLoading: nextProps.updateUsername.fetching,
    };

    if (!nextProps.updateEmail.success && prevState.isEmailUpdateLoading && !nextProps.updateEmail.fetching) {
      Object.assign(nextState, {
        errorInformations: nextProps.updateEmail.error,
      });
    } else if (
      !nextProps.updateUsername.success
      && prevState.isUsernameUpdateLoading
      && !nextProps.updateUsername.fetching
    ) {
      Object.assign(nextState, {
        errorInformations: nextProps.updateUsername.error,
      });
    }

    if (!nextProps.updatePassword.success && prevState.isPasswordChangeLoading && !nextProps.updatePassword.fetching) {
      Object.assign(nextState, {
        errorPassword: nextProps.updatePassword.error,
      });
    }

    if (!nextProps.updatePhotoURL.success && prevState.isPhotoURLUpdateLoading && !nextProps.updatePhotoURL.fetching) {
      Object.assign(nextState, {
        errorPictures: nextProps.updatePhotoURL.error,
      });
    } else if (
      nextProps.updatePhotoURL.success
      && prevState.isPhotoURLUpdateLoading
      && !nextProps.updatePhotoURL.fetching
    ) {
      Object.assign(nextState, {
        photoURL: nextProps.updatePhotoURL.photoURL,
      });
    }

    if (
      !nextProps.uploadProfilePicture.success
      && prevState.isProfilePictureUploading
      && !nextProps.uploadProfilePicture.fetching
    ) {
      Object.assign(nextState, {
        errorPictures: nextProps.uploadProfilePicture.error,
      });
    } else if (
      nextProps.uploadProfilePicture.success
      && prevState.isProfilePictureUploading
      && !nextProps.uploadProfilePicture.fetching
    ) {
      nextProps.updatePhotoURLRequest({ photoURL: nextProps.uploadProfilePicture.photoURL });
    }

    return nextState;
  }

  constructor(props) {
    super(props);

    this.state = {
      currentPassword: '',
      email: props.user.email || '',
      errorInformations: null,
      errorPassword: null,
      errorPictures: null,
      isEmailUpdateLoading: false,
      isPasswordChangeLoading: false,
      isPhotoURLUpdateLoading: false,
      isProfilePictureUploading: false,
      isUsernameUpdateLoading: false,
      name: props.user.displayName || '',
      password: '',
      passwordConfirmation: '',
      photoURL: props.user.photoURL || '',
      showPictureModal: false,
    };
  }

  onChangeEmail = (email: string) => this.setState({ email, errorInformations: null });

  onChangeName = (name: string) => this.setState({ name, errorInformations: null });

  onChangeCurrentPassword = (currentPassword: string) => this.setState({ currentPassword, errorPassword: null });

  onChangePassword = (password: string) => this.setState({ password, errorPassword: null });

  onChangePasswordConfirmation = (passwordConfirmation: string) => {
    this.setState({ passwordConfirmation, errorPassword: null });
  };

  onUpdateInfo = () => {
    this.setState({ errorInformations: null });
    if (this.state.name !== this.props.user.displayName) {
      this.props.updateUsernameRequest({ username: this.state.name });
    }
    if (this.state.email !== this.props.user.email) {
      this.props.updateEmailRequest({ email: this.state.email });
    }
  };

  onUpdatePassword = () => {
    if (
      this.state.password === this.state.passwordConfirmation
      && this.state.currentPassword === this.props.user.password
    ) {
      this.props.updatePasswordRequest({ password: this.state.password });
    } else if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({ errorPassword: i18n.t('PROFILE.FORM.ERROR.PASSWORD_MISMATCH') });
    } else {
      this.setState({ errorPassword: i18n.t('PROFILE.FORM.ERROR.BAD_CURRENT_PASSWORD') });
    }
  };

  focusNewPassword = () => this.newPasswordInput.focus();

  focusNewPasswordConfirmation = () => this.newPasswordConfirmationInput.focus();

  hideKeyboard = () => Keyboard.dismiss();

  openCamera = () => {
    try {
      this.setState({ errorPictures: null, showPictureModal: false });
      this.checkAndLaunchCamera().then((image) => {
        this.props.uploadProfilePictureRequest({ image });
      });
    } catch (err) {
      this.setState({ errorPictures: err.message || JSON.stringify(err) });
    }
  };

  openLibrary = () => {
    try {
      this.setState({ errorPictures: null, showPictureModal: false });
      this.checkAndOpenPhotoLibrary().then((image) => {
        this.props.uploadProfilePictureRequest({ image });
      });
    } catch (err) {
      this.setState({ errorPictures: err.message || JSON.stringify(err) });
    }
  };

  toggleChangePictureModal = () => this.setState({ showPictureModal: !this.state.showPictureModal });

  render() {
    const {
      currentPassword,
      email,
      errorInformations,
      errorPassword,
      errorPictures,
      isEmailUpdateLoading,
      isPasswordChangeLoading,
      isPhotoURLUpdateLoading,
      isProfilePictureUploading,
      isUsernameUpdateLoading,
      name,
      password,
      passwordConfirmation,
      photoURL,
      showPictureModal,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.header} />
          <View style={styles.avatarContainer}>
            <Touchable style={styles.avatarBackground} onPress={this.toggleChangePictureModal}>
              <View style={styles.avatar}>
                {!photoURL ? (
                  <Icon name="face" size={50} />
                ) : (
                  <Image source={{ uri: photoURL }} style={styles.avatar} />
                )}
                {(isPhotoURLUpdateLoading || isProfilePictureUploading) && (
                  <View style={styles.activityIndicator}>
                    <ActivityIndicator />
                  </View>
                )}
              </View>
            </Touchable>
            <Touchable onPress={this.toggleChangePictureModal} style={styles.changeAvatarContainer}>
              <Icon name="edit" size={16} />
            </Touchable>
          </View>

          <ErrorComponent show={!!errorPictures}>{errorPictures}</ErrorComponent>
          <ErrorComponent show={!!errorInformations}>{errorInformations}</ErrorComponent>

          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={this.onChangeName}
            onSubmitEditing={this.hideKeyboard}
            placeholder={i18n.t('PROFILE.FORM.NAME')}
            returnKeyType="done"
            textContentType="name"
            value={name}
          />

          <TextInput
            autoCapitalize="none"
            onChangeText={this.onChangeEmail}
            onSubmitEditing={this.hideKeyboard}
            placeholder={i18n.t('PROFILE.FORM.EMAIL')}
            returnKeyType="done"
            textContentType="username"
            value={email}
          />

          <Button
            isDisabled={isPasswordChangeLoading}
            isLoading={isEmailUpdateLoading || isUsernameUpdateLoading}
            onPress={this.onUpdateInfo}
            text={i18n.t('PROFILE.UPDATE')}
          />

          <ErrorComponent show={!!errorPassword}>{errorPassword}</ErrorComponent>

          <TextInput
            autoCapitalize="none"
            onChangeText={this.onChangeCurrentPassword}
            onSubmitEditing={this.focusNewPassword}
            placeholder={i18n.t('PROFILE.FORM.CURRENT_PASSWORD')}
            returnKeyType="next"
            secureTextEntry
            textContentType="password"
            value={currentPassword}
          />

          <TextInput
            autoCapitalize="none"
            onChangeText={this.onChangePassword}
            onSubmitEditing={this.focusNewPasswordConfirmation}
            placeholder={i18n.t('PROFILE.FORM.NEW_PASSWORD')}
            ref={(ref) => { this.newPasswordInput = ref; }}
            returnKeyType="next"
            secureTextEntry
            textContentType="password"
            value={password}
          />

          <TextInput
            autoCapitalize="none"
            onChangeText={this.onChangePasswordConfirmation}
            onSubmitEditing={this.onUpdatePassword}
            placeholder={i18n.t('PROFILE.FORM.NEW_PASSWORD_CONFIRMATION')}
            ref={(ref) => { this.newPasswordConfirmationInput = ref; }}
            returnKeyType="send"
            secureTextEntry
            textContentType="password"
            value={passwordConfirmation}
          />

          <Button
            isDisabled={isEmailUpdateLoading || isUsernameUpdateLoading}
            isLoading={isPasswordChangeLoading}
            onPress={this.onUpdatePassword}
            text={i18n.t('PROFILE.CHANGE_PASSWORD')}
          />

          <Modal transparent visible={showPictureModal} onRequestClose={this.toggleChangePictureModal}>
            <TouchableWithoutFeedback onPress={this.toggleChangePictureModal}>
              <View style={styles.modal}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{i18n.t('PROFILE.PICTURE.CHANGE')}</Text>

                    <Button
                      onPress={this.openCamera}
                      buttonStyle={styles.button}
                      text={i18n.t('PROFILE.PICTURE.OPEN_CAMERA')}
                    />

                    <Button
                      onPress={this.openLibrary}
                      buttonStyle={styles.button}
                      text={i18n.t('PROFILE.PICTURE.OPEN_LIBRARY')}
                    />

                    <Touchable onPress={this.toggleChangePictureModal} style={styles.closeModalIcon}>
                      <Icon name="close" size={22} />
                    </Touchable>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
