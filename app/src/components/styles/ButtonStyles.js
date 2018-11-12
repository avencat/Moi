import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '@resources/themes';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.defaultApp.pink,
    borderRadius: 3,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    marginVertical: 25,
    width: Metrics.screenWidth * 0.9,
  },

  text: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h6,
    textAlign: 'center',
  },
});
