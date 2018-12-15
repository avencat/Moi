import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '@resources/themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultApp.blueGreen,
    flex: 1,
  },

  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  fingerprint: {
    alignItems: 'center',
    backgroundColor: Colors.defaultApp.yellow,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },

  title: {
    color: Colors.white,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h1,
    fontWeight: '400',
    marginBottom: 50,
    marginTop: -50,
    textAlign: 'center',
  },
});
