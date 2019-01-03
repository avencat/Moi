import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '@resources/themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },

  nothing: {
    color: Colors.text.base,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    marginVertical: 15,
    textAlign: 'center',
  },

  touchIdContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: 15,
    width: '90%',
  },

  touchIdString: {
    color: Colors.text.dark,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
  },
});
