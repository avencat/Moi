// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import i18n from '@resources/translations';
import TextInput from '@components/TextInput';
import DrawerButton from '@components/DrawerButton';
import ErrorComponent from '@components/ErrorComponent';
import { AddPostToDatabaseCreators } from '@containers/home/redux/addPostToDatabaseReducer';
import styles from './HomeScreenStyles';

type Props = NavigationScreenProps & {
  addPostToDatabase: {
    error?: string,
    fetching: boolean,
    success: boolean,
  },
  addPostToDatabaseRequest: Function,
};

type State = {
  error?: string,
  post: string,
  isAddPostLoading: boolean,
};

const mapStateToProps = state => ({
  addPostToDatabase: state.forms.addPostToDatabase,
});
const mapDispatchToProps = dispatch => ({
  addPostToDatabaseRequest: payload => dispatch(AddPostToDatabaseCreators.addPostToDatabaseRequest(payload)),
});
class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton openDrawer={navigation.openDrawer} />,
    title: i18n.t('POST.TITLE'),
  });

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = { isAddPostLoading: nextProps.addPostToDatabase.fetching };

    if (nextProps.addPostToDatabase.success && prevState.isAddPostLoading && !nextState.isAddPostLoading) {
      Object.assign(nextState, {
        post: '',
      });
    } else if (!nextProps.addPostToDatabase.success && prevState.isAddPostLoading && !nextState.isAddPostLoading) {
      Object.assign(nextState, {
        error: nextProps.addPostToDatabase.error,
      });
    }

    return nextState;
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      post: '',
      isAddPostLoading: false,
    };
  }

  onChangePost = (post: string) => this.setState({ post });

  onPost = () => {
    const { post } = this.state;

    if (!post) {
      return;
    }

    this.props.addPostToDatabaseRequest({ postContent: post });
  };

  render() {
    const {
      post,
      error,
      isAddPostLoading,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ErrorComponent show={!!error}>{error}</ErrorComponent>
        <ScrollView style={styles.container}>
          <TextInput
            placeholder={i18n.t('POST.WHATS_UP')}
            onChangeText={this.onChangePost}
            onSubmitEditing={this.onPost}
            returnKeyType="send"
            blurOnSubmit
            value={post}
          />
          <ActivityIndicator
            size="large"
            color="#00ff00"
            animating={isAddPostLoading}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
