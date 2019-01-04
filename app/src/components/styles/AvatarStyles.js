import { StyleSheet } from 'react-native';
import { Colors } from '@resources/themes';

export default StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 34,
    height: '92%',
    justifyContent: 'center',
    left: 0,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    width: '92%',
  },

  avatar: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 34,
    height: '92%',
    justifyContent: 'center',
    width: '92%',
  },

  avatarBackground: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.defaultApp.blueGreen,
    borderRadius: 37,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});
