import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '@resources/themes';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
    width: Metrics.screenWidth * 0.9,
  },

  defaultTextInput: {
    flexGrow: 1,
    color: Colors.text.base,
    padding: 0,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
  },
});
