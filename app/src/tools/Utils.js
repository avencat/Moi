/* eslint-disable no-console */
import { Platform } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import ImageResizer from 'react-native-image-resizer';

const compressImageIOS = async (imagePath, currentImageSize, maxSize = 2000000, maximumWidth = 1500) => {
  try {
    let quality = 100;
    let maxWidth = maximumWidth;
    let imageURI = imagePath;
    let imgSize = currentImageSize;
    let newImage = {
      path: imagePath,
      name: `${Math.round(Date.now() / 1000)}.jpg`,
    };

    while (imgSize > maxSize && (quality > 0 || maxWidth > 0)) {
      /* eslint-disable no-await-in-loop */
      newImage = await ImageResizer.createResizedImage(imageURI, maxWidth, 2000, 'JPEG', quality);
      imageURI = newImage.uri;
      imgSize = newImage.size;

      if (maxWidth > 512) {
        maxWidth = maxWidth - 200 < 512 ? 512 : maxWidth - 200;
      } else {
        quality = quality > 0 ? quality - 10 : 0;
        maxWidth = maxWidth <= 256 ? 256 : maxWidth - 50;
      }
    }

    console.info(
      `Sending image ${imageURI} of ${imgSize}B. Max size allowed is ${maxSize}B so success is ${imgSize <= maxSize}.`,
    );
    return { imageURI, success: imgSize <= maxSize, newImage };
  } catch (err) {
    throw err;
  }
};

export default {
  compressImage: async (
    imagePath,
    currentImageSize,
    maxSize = 2000000,
    maximumWidth = 1500,
    authorizeIOSCompression = false,
  ) => {
    if (Platform.OS === 'ios' && authorizeIOSCompression) {
      return compressImageIOS(imagePath, currentImageSize, maxSize, maximumWidth);
    }
    try {
      let quality = 100;
      let maxWidth = maximumWidth;
      let imageURI = imagePath;
      let imgSize = currentImageSize;
      let newImage = {
        path: imagePath,
        name: `${Math.round(Date.now() / 1000)}.jpg`,
      };

      while (imgSize > maxSize && (quality > 0 || maxWidth > 0)) {
        /* eslint-disable no-await-in-loop */
        newImage = await ImageResizer.createResizedImage(imageURI, maxWidth, 2000, 'JPEG', quality);
        imageURI = newImage.uri;
        imgSize = newImage.size;

        if (quality <= 0) {
          maxWidth = maxWidth > 350 ? maxWidth - 200 : maxWidth - 50;
        }
        quality = quality > 0 ? quality - 10 : 0;
      }

      console.info(
        `Sending image ${imageURI} of ${imgSize}B. Max size allowed is ${maxSize}B so success is ${imgSize <=
        maxSize}.`,
      );
      return { imageURI, success: imgSize <= maxSize, newImage };
    } catch (err) {
      throw err;
    }
  },

  getImageUri: (image) => {
    if (Platform.OS === 'android' && image.uri) {
      return image.uri;
    }
    return image.path;
  },
};
