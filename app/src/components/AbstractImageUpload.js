// @flow
import * as React from 'react';
import { Alert, Platform } from 'react-native';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import DeviceSettings from 'react-native-device-settings';
import Utils from '@tools/Utils';
import i18n from '@resources/translations';

/* eslint-disable lines-between-class-members */
export default class AbstractImageUpload<Props, State> extends React.Component<Props, State> {
  PERMISSION_TITLE = i18n.t('PROFILE.PERMISSIONS.DENIED');
  PERMISSION_MESSAGE = i18n.t('PROFILE.PERMISSIONS.MESSAGE_CAMERA');
  PERMISSION_CANCEL = i18n.t('PROFILE.PERMISSIONS.CANCEL');
  PERMISSION_SETTINGS = i18n.t('PROFILE.PERMISSIONS.SETTINGS');
  PERMISSION_OPEN_SETTINGS = i18n.t('GLOBAL.OPEN_SETTINGS');

  CROPPER_CANCEL_TEXT = i18n.t('GLOBAL.CANCEL');
  CROPPER_CHOOSE_TEXT = i18n.t('GLOBAL.RESIZE_PHOTO.RESIZE');
  CROPPER_TOOLBAR_TITLE = i18n.t('GLOBAL.RESIZE_PHOTO.TITLE');

  COMPRESS_ERROR_TITLE = i18n.t('GLOBAL.ERROR.ERROR_OCCURRED');
  COMPRESS_ERROR_TOO_BIG = i18n.t('GLOBAL.ERROR.FILE_TOO_BIG');

  IMAGE_PICKER_CAMERA_MESSAGE = i18n.t('GLOBAL.ERROR.MESSAGE_CAMERA');
  IMAGE_PICKER_LIBRARY_MESSAGE = i18n.t('GLOBAL.ERROR.MESSAGE_LIBRARY');
  IMAGE_PICKER_ERROR_OK = i18n.t('GLOBAL.OK');
  IMAGE_PICKER_CANCEL = i18n.t('GLOBAL.CANCEL');
  IMAGE_PICKER_ERROR_TITLE = i18n.t('GLOBAL.ERROR.ERROR_OCCURRED');
  IMAGE_PICKER_ERROR_MESSAGE = i18n.t('GLOBAL.ERROR.GENERIC_ERROR');

  cameraOptions = {
    // override it in subclass to have cropping
    // compressImageMaxHeight: 512,
    // compressImageMaxWidth: 512,
  };
  libraryOptions = {
    // override it in subclass to have cropping
    // cropping: true,
    // height: 512,
    // width: 512,
  };
  compressOptions = {
    // you can override it in subclass
    enable: true,
    maxSize: 1000000,
    maxWidth: 1000,
    authorizeIOSCompression: true,
  };

  // display the permission alert
  alertPermissions = (text: string = this.PERMISSION_MESSAGE) => Alert.alert(this.PERMISSION_TITLE, text, [
    { text: this.PERMISSION_CANCEL, style: 'cancel' },
    { text: this.PERMISSION_SETTINGS, onPress: () => DeviceSettings.app() },
  ]);

  // ask if we can open settings (only ios supported)
  canOpenSettings = async () => {
    if (Platform.OS !== 'ios') {
      return false;
    }
    return Permissions.canOpenSettings();
  };

  // check if we have the permission, and launch the camera if it's ok
  // display an alert if not
  checkAndLaunchCamera = async () => {
    const permission = await this.checkCameraPermission();
    if (permission === 'authorized') {
      return this.launchCamera();
    }
    return this.alertPermissions();
  };

  // check if we have camera permission
  checkCameraPermission = async () => {
    const response = await Permissions.check('camera');
    switch (response) {
      case 'undetermined':
      case 'denied':
        return Permissions.request('camera');
      case 'authorized':
      default:
        return response;
    }
  };

  // Open the camera
  // return null if cancelled
  launchCamera = async () => {
    const options = {
      cropperCancelText: this.CROPPER_CANCEL_TEXT,
      cropperChooseText: this.CROPPER_CHOOSE_TEXT,
      cropperToolbarTitle: this.CROPPER_TOOLBAR_TITLE,
      useFrontCamera: true,
      ...this.cameraOptions,
    };

    let image = null;
    try {
      image = await ImagePicker.openCamera(options);
    } catch (err) {
      switch (err.code) {
        case 'E_PICKER_CANCELLED':
          return null;
        case 'E_PERMISSION_MISSING': {
          const canOpenSettings = await this.canOpenSettings();
          Alert.alert(this.IMAGE_PICKER_ERROR_TITLE, this.IMAGE_PICKER_CAMERA_MESSAGE, [
            canOpenSettings ? { text: this.IMAGE_PICKER_CANCEL, style: 'cancel' } : {},
            canOpenSettings
              ? { text: this.PERMISSION_OPEN_SETTINGS, onPress: Permissions.openSettings }
              : { text: this.IMAGE_PICKER_ERROR_OK },
          ]);
          throw err;
        }
        default: {
          Alert.alert(this.IMAGE_PICKER_ERROR_TITLE, `${this.IMAGE_PICKER_ERROR_MESSAGE} ${err.code}\n${err.message}`);
          throw err;
        }
      }
    }
    return this.compressImage(image);
  };

  // check if we have the permission, and open photo library if it's ok
  // display an alert if not
  checkAndOpenPhotoLibrary = async () => {
    const response = await Permissions.check('photo');
    switch (response) {
      case 'authorized':
        return this.openPhotoLibrary();
      case 'undetermined':
      case 'denied': {
        const permission = await Permissions.request('photo');
        if (permission === 'authorized') {
          return this.openPhotoLibrary();
        }
        this.alertPermissions(this.IMAGE_PICKER_LIBRARY_MESSAGE);
        throw new Error('permission');
      }
      default:
        this.alertPermissions(this.IMAGE_PICKER_LIBRARY_MESSAGE);
        throw new Error('permission');
    }
  };

  // open photo library
  // return null if cancelled
  openPhotoLibrary = async () => {
    const options = {
      cropperCancelText: this.CROPPER_CANCEL_TEXT,
      cropperChooseText: this.CROPPER_CHOOSE_TEXT,
      cropperToolbarTitle: this.CROPPER_TOOLBAR_TITLE,
      ...this.libraryOptions,
    };

    let image = null;
    try {
      image = await ImagePicker.openPicker(options);
    } catch (err) {
      switch (err.code) {
        case 'E_PICKER_CANCELLED':
          return null;
        case 'E_PERMISSION_MISSING': {
          const canOpenSettings = await this.canOpenSettings();
          Alert.alert(this.IMAGE_PICKER_ERROR_TITLE, this.IMAGE_PICKER_LIBRARY_MESSAGE, [
            canOpenSettings ? { text: this.IMAGE_PICKER_CANCEL, style: 'cancel' } : {},
            canOpenSettings
              ? { text: this.PERMISSION_OPEN_SETTINGS, onPress: Permissions.openSettings }
              : { text: this.IMAGE_PICKER_ERROR_OK },
          ]);
          throw err;
        }
        default: {
          Alert.alert(this.IMAGE_PICKER_ERROR_TITLE, `${this.IMAGE_PICKER_ERROR_MESSAGE} ${err.code}\n${err.message}`);
          throw err;
        }
      }
    }

    return this.compressImage(image);
  };

  // Compress the image if enabled
  compressImage = async (image) => {
    const options = this.compressOptions;
    if (!options.enable) {
      return image;
    }

    try {
      const { newImage, success } = await Utils.compressImage(
        image.path,
        image.size,
        options.maxSize,
        options.maxWidth,
        options.authorizeIOSCompression,
      );
      if (success) {
        if (image.filename) {
          // ios
          newImage.name = `${image.filename.substr(0, image.filename.lastIndexOf('.'))}.jpg`;
        } else if (image.path) {
          // in android, we have to deduct from image path
          const name = image.path.split('/').pop();
          if (name && name.length < 20) {
            // but if it's from resized image, the name is too long, so skip it
            newImage.name = name;
          }
        }
        return newImage;
      }
    } catch (err) {
      Alert.alert(this.COMPRESS_ERROR_TITLE, err.message);
      throw err;
    }

    Alert.alert(this.COMPRESS_ERROR_TITLE, this.COMPRESS_ERROR_TOO_BIG);
    throw new Error('too-big');
  };
}
