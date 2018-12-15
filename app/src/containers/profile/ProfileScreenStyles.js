import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '@resources/themes';

export default StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 34,
    height: 68,
    justifyContent: 'center',
    left: 0,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    width: 68,
  },

  avatar: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 34,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },

  avatarBackground: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.defaultApp.blueGreen,
    borderRadius: 37,
    height: 74,
    justifyContent: 'center',
    width: 74,
  },

  avatarContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 80,
    justifyContent: 'center',
    marginTop: -40,
    width: 80,
  },

  button: {
    backgroundColor: Colors.defaultApp.blueGreen,
    marginVertical: 5,
    width: Metrics.screenWidth * 0.6,
  },

  changeAvatarContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 13,
    height: 26,
    justifyContent: 'center',
    opacity: 0.9,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 26,
  },

  closeModalIcon: {
    position: 'absolute',
    padding: 3,
    right: 3,
    top: 3,
  },

  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },

  header: {
    alignSelf: 'center',
    backgroundColor: Colors.defaultApp.yellow,
    borderRadius: 250,
    height: 500,
    marginTop: -415,
    transform: [
      { scaleX: 2 },
    ],
    width: 500,
  },

  modal: {
    alignItems: 'center',
    backgroundColor: Colors.modal,
    flex: 1,
    justifyContent: 'center',
  },

  modalContent: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  modalTitle: {
    color: Colors.text.dark,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.title,
    padding: 25,
    textAlign: 'center',
  },
});
