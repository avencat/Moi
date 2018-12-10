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
