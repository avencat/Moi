import { StyleSheet } from 'react-native';
import { Colors } from '@resources/themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  row: {
    elevation: 1,
    borderRadius: 2,
    flex: 1,
    flexDirection: 'row', // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    marginLeft: 10,
    marginRight: 10,
  },
  row_name: {
    flex: 1,
    flexDirection: 'row', // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 16,
    marginLeft: 10,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6,
    fontSize: 12,
    color: '#0686E4',
  },
  row_msg: {
    flex: 1,
    flexDirection: 'row', // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    paddingTop: 0,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6,
    fontSize: 20,
  },
});
