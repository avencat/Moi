import { StyleSheet } from 'react-native';
import { Colors } from '@resources/themes';

export default StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 34,
    height: 68,
    justifyContent: 'center',
    left: 0,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    width: 68,
  },

  avatar: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 34,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },

  avatarBackground: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.defaultApp.blueGreen,
    borderRadius: 37,
    height: 74,
    justifyContent: 'center',
    width: 74,
  },
});
