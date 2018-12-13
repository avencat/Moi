// @flow
import * as React from 'react';
import firebase from 'firebase';
import { Platform, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { NavigationScreenProps } from 'react-navigation';
import Utils from '@tools/Utils';
import DrawerButton from '@components/DrawerButton';
import AbstractImageUpload from '@components/AbstractImageUpload';
import styles from './ProfileScreenStyles';

type Props = NavigationScreenProps & {};
type State = {
  error?: string,
};

export default class ProfileScreen extends AbstractImageUpload<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton openDrawer={navigation.openDrawer} />,
  });

  openCamera = () => {
    try {
      this.setState({ error: null });
      this.checkAndLaunchCamera().then(this.uploadImage);
    } catch (err) {
      // do something?
    }
  };

  openLibrary = () => {
    try {
      this.setState({ error: null });
      this.checkAndOpenPhotoLibrary().then(this.uploadImage);
    } catch (err) {
      // do something?
    }
  };

  uploadImage = image => new Promise((resolve, reject) => {
    if (!image) {
      return;
    }

    const uri = Utils.getImageUri(image);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;

    const imageRef = firebase.storage().ref('profilePictures').child(image.name);

    RNFetchBlob.fs.readFile(uploadUri, 'base64')
      .then(data => RNFetchBlob.polyfill.Blob.build(data, { type: 'application/octet-stream;BASE64' }))
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: 'application/octet-stream' });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });

  render() {
    return (
      <View style={styles.container} />
    );
  }
}
