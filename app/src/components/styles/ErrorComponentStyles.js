import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '@resources/themes';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: Colors.error,
    borderRadius: 4,
    justifyContent: 'center',
    marginVertical: 8,
    padding: 5,
    width: Metrics.screenWidth * 0.9,
  },

  text: {
    color: Colors.white,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    backgroundColor: Colors.transparent,
  },
});
