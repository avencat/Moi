// @flow
import firebase from 'firebase';
import RNFetchBlob from 'rn-fetch-blob';
import { put, takeEvery } from 'redux-saga/effects';
import Utils from '@tools/Utils';
import {
  UploadProfilePictureCreators,
  UploadProfilePictureTypes,
} from '@containers/profile/redux/uploadProfilePictureReducer';
import { select } from 'redux-saga/es/effects';

/**
 *  Upload profile picture task
 */

export function* uploadProfilePictureTask({ payload }) {
  try {
    /* eslint-disable no-undef */
    const oldXMLHttpRequest = window.XMLHttpRequest;
    const oldBlob = window.Blob;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = RNFetchBlob.polyfill.Blob;

    const store = yield select();
    const uri = yield Utils.getImageUri(payload.image);
    const imageRef = yield firebase.storage().ref('profilePictures').child(`${store.user.uid}.jpg`);
    const data = yield RNFetchBlob.fs.readFile(uri, 'base64');
    const blob = yield RNFetchBlob.polyfill.Blob.build(data, { type: 'application/octet-stream;BASE64' });
    const uploadBlob = blob;
    yield imageRef.put(blob, { contentType: 'application/octet-stream' });
    yield uploadBlob.close();
    const photoURL = yield imageRef.getDownloadURL();
    yield put(UploadProfilePictureCreators.uploadProfilePictureRequestSuccess(photoURL));

    window.XMLHttpRequest = oldXMLHttpRequest;
    window.Blob = oldBlob;
    /* eslint-enable no-undef */
  } catch (error) {
    yield put(UploadProfilePictureCreators.uploadProfilePictureRequestFailure(
      error.message ? error.message : JSON.stringify(error),
    ));
  }
}

/**
 * Loop upload profile picture saga
 */
export function* uploadProfilePictureSaga() {
  yield takeEvery(UploadProfilePictureTypes.UPLOAD_PROFILE_PICTURE_REQUEST, uploadProfilePictureTask);
}
