import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '@resources/themes';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
    width: Metrics.screenWidth * 0.9,
  },
});
