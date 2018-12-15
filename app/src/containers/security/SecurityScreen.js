// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';
import { NavigationScreenProps } from 'react-navigation';
import {
  AsyncStorage, ScrollView, Switch, Text, View,
} from 'react-native';
import i18n from '@resources/translations';
import DrawerButton from '@components/DrawerButton';
import styles from './SecurityScreenStyles';

type Props = NavigationScreenProps & {
  user: {
    email: string,
    password: string,
  },
};
type State = {
  touchIdCompatible: boolean,
  touchIdEnabled: boolean,
  touchIdString: string,
};

const mapStateToProps = state => ({
  user: state.user,
});
class SecurityScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton openDrawer={navigation.openDrawer} />,
    title: i18n.t('SECURITY.TITLE'),
  });

  constructor(props) {
    super(props);

    this.state = {
      touchIdCompatible: false,
      touchIdEnabled: false,
      touchIdString: '',
    };
  }

  componentDidMount() {
    TouchID.isSupported()
      .then(touchIdString => this.setState({ touchIdCompatible: true, touchIdString }))
      .catch(() => {});

    this.getTouchIdEnabled();
  }

  getTouchIdEnabled = async () => {
    try {
      const touchIdEnabled = await AsyncStorage.getItem('@MoiAsyncStorage:touchIdEnabled');
      this.setState({ touchIdEnabled: touchIdEnabled === 'true' });
    } catch (error) {
      // TODO: display the error
    }
  };

  toggleTouchId = async () => {
    try {
      await AsyncStorage.setItem('@MoiAsyncStorage:touchIdEnabled', this.state.touchIdEnabled ? 'false' : 'true');
      if (!this.state.touchIdEnabled) {
        Keychain.setGenericPassword(this.props.user.email, this.props.user.password);
      } else {
        Keychain.resetGenericPassword();
      }
      this.setState({ touchIdEnabled: !this.state.touchIdEnabled });
    } catch (error) {
      // TODO: Display an error
    }
  };

  render() {
    const {
      touchIdCompatible,
      touchIdEnabled,
      touchIdString,
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        {touchIdCompatible ? (
          <View style={styles.touchIdContainer}>
            <Text>{touchIdString}</Text>
            <Switch onValueChange={this.toggleTouchId} value={touchIdEnabled} />
          </View>
        ) : (
          <Text style={styles.nothing}>{i18n.t('SECURITY.NOTHING')}</Text>
        )}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(SecurityScreen);
