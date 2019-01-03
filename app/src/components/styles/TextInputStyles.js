import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '@resources/themes';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: 8,
    padding: 8,
    width: Metrics.screenWidth * 0.9,
  },

  defaultTextInput: {
    color: Colors.text.base,
    flexGrow: 1,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
    padding: 0,
  },
});
