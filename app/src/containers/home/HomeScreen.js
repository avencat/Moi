// @flow
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import DrawerButton from '@components/DrawerButton';
import i18n from '@resources/translations';
import TextInput from '@components/TextInput';
import { PostCreators } from '@containers/home/redux/postReducer';
import connect from 'react-redux/es/connect/connect';
import ErrorComponent from '@components/ErrorComponent';
import styles from './HomeScreenStyles';

type Props = NavigationScreenProps & {
  post: {
    error?: string,
    fetching: boolean,
    success: boolean,
  },
  postRequest: Function,
};

const mapStateToProps = state => ({
  user: state.post,
});
const mapDispatchToProps = dispatch => ({
  homeRequest: payload => dispatch(PostCreators.postRequest(payload)),
});

class HomeScreen extends React.PureComponent<Props> {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton openDrawer={navigation.openDrawer} />,
  });

  constructor(props) {
    super(props);

    this.state = {
      post: '',
      error: null,
    };
  }

  onPost = () => {
    const { post } = this.state;
    if (!post) {
      this.setState({ error: i18n.t('POST.FORM.ERROR.FILL') });
      return;
    }

    this.props.postRequest({ post });
  };

  render() {
    const {
      post, error,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ErrorComponent show={!!error}>{error}</ErrorComponent>
        <ScrollView style={styles.container}>
          <View style={styles.header} />
          <TextInput
            placeholder={"What's on your mind"}
            onSubmitEditing={this.onPost()}
            returnKeyType="send"
            blurOnSubmit
            value={post}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
