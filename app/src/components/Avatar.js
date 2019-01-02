// @flow
import * as React from 'react';
import { Icon } from 'react-native-elements';
import { ActivityIndicator, Image, View } from 'react-native';
import Touchable from '@components/Touchable';
import styles from '@components/styles/AvatarStyles';

type Props = {
  isLoading?: boolean,
  onPress?: Function,
  photoURL?: string,
};

export default class Avatar extends React.PureComponent<Props> {
  static defaultProps = {
    isLoading: false,
    onPress: () => {},
    photoURL: null,
  };

  render() {
    const { isLoading, onPress, photoURL } = this.props;
    const MyTouchable = typeof onPress === 'function' ? Touchable : View;

    return (
      <MyTouchable style={styles.avatarBackground} onPress={onPress}>
        <View style={styles.avatar}>
          {!photoURL ? (
            <Icon name="face" size={50} />
          ) : (
            <Image source={{ uri: photoURL }} style={styles.avatar} />
          )}
          {isLoading && (
            <View style={styles.activityIndicator}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      </MyTouchable>
    );
  }
}
