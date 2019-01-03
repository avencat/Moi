import { StyleSheet } from 'react-native';
import { Colors } from '@resources/themes';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
  },

  instructions: {
    color: Colors.darkText,
    marginBottom: 5,
    textAlign: 'center',
  },

  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
});
