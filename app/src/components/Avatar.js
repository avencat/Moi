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
  size?: string,
};

export default class Avatar extends React.PureComponent<Props> {
  static defaultProps = {
    isLoading: false,
    onPress: () => {},
    photoURL: null,
    size: 'medium',
  };

  getAvatarBackgroundSize = () => {
    switch (this.props.size) {
      case 'large':
        return {
          borderRadius: 37,
          height: 74,
          width: 74,
        };
      case 'small':
        return {
          borderRadius: 27,
          height: 54,
          width: 54,
        };
      default:
        return {
          borderRadius: 32,
          height: 64,
          width: 64,
        };
    }
  };

  getAvatarSize = () => {
    switch (this.props.size) {
      case 'large':
        return {
          borderRadius: 34,
          height: 68,
          width: 68,
        };
      case 'small':
        return {
          borderRadius: 24,
          height: 48,
          width: 48,
        };
      default:
        return {
          borderRadius: 29,
          height: 58,
          width: 58,
        };
    }
  };

  getIconSize = () => {
    switch (this.props.size) {
      case 'large':
        return 50;
      case 'small':
        return 30;
      default:
        return 40;
    }
  };

  render() {
    const { isLoading, onPress, photoURL } = this.props;
    const MyTouchable = typeof onPress === 'function' ? Touchable : View;

    return (
      <MyTouchable style={[styles.avatarBackground, this.getAvatarBackgroundSize()]} onPress={onPress}>
        <View style={[styles.avatar, this.getAvatarSize()]}>
          {!photoURL ? (
            <Icon name="face" size={this.getIconSize()} />
          ) : (
            <Image source={{ uri: photoURL }} style={[styles.avatar, this.getAvatarSize()]} />
          )}
          {isLoading && (
            <View style={[styles.activityIndicator, this.getAvatarSize()]}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      </MyTouchable>
    );
  }
}
