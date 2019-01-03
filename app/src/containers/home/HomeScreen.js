// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { FlatList, SafeAreaView, Text } from 'react-native';
import i18n from '@resources/translations';
import TextInput from '@components/TextInput';
import DrawerButton from '@components/DrawerButton';
import ErrorComponent from '@components/ErrorComponent';
import { GetPostsCreators } from '@containers/home/redux/getPostsReducer';
import { AddPostToDatabaseCreators } from '@containers/home/redux/addPostToDatabaseReducer';
import styles from './HomeScreenStyles';
import Avatar from '@components/Avatar';

type Props = NavigationScreenProps & {
  addPostToDatabase: {
    error?: string,
    fetching: boolean,
    post: {
      content: string,
      id: string,
      timestamp: number,
      user: {
        photoURL?: string,
        uid: string,
        username: string,
      },
    },
    success: boolean,
  },
  addPostToDatabaseRequest: Function,
  getPosts: {
    error?: string,
    fetching: boolean,
    posts: {},
    success: boolean,
  },
  getPostsRequest: Function,
};

type State = {
  error?: string,
  isAddPostLoading: boolean,
  isGetPostsLoading: boolean,
  post: string,
  posts: Array<{}>,
};

const mapStateToProps = state => ({
  addPostToDatabase: state.forms.addPostToDatabase,
  getPosts: state.forms.getPosts,
});
const mapDispatchToProps = dispatch => ({
  addPostToDatabaseRequest: payload => dispatch(AddPostToDatabaseCreators.addPostToDatabaseRequest(payload)),
  getPostsRequest: payload => dispatch(GetPostsCreators.getPostsRequest(payload)),
});
class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton openDrawer={navigation.openDrawer} />,
    title: i18n.t('POST.TITLE'),
  });

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {
      isAddPostLoading: nextProps.addPostToDatabase.fetching,
      isGetPostsLoading: nextProps.getPosts.fetching,
    };

    if (nextProps.addPostToDatabase.success && prevState.isAddPostLoading && !nextState.isAddPostLoading) {
      const newPosts = [...prevState.posts];
      newPosts.unshift(nextProps.addPostToDatabase.post);

      Object.assign(nextState, {
        post: '',
        posts: newPosts,
      });
    } else if (!nextProps.addPostToDatabase.success && prevState.isAddPostLoading && !nextState.isAddPostLoading) {
      Object.assign(nextState, {
        error: nextProps.addPostToDatabase.error,
      });
    }

    if (nextProps.getPosts.success && !nextState.isGetPostsLoading && prevState.isGetPostsLoading) {
      Object.assign(nextState, {
        posts: nextProps.getPosts.posts,
      });
    }

    return nextState;
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isAddPostLoading: false,
      isGetPostsLoading: false,
      post: '',
      posts: [],
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  onChangePost = (post: string) => this.setState({ post });

  onPost = () => {
    const { post } = this.state;

    if (!post) {
      return;
    }

    this.props.addPostToDatabaseRequest({ postContent: post });
  };

  fetchPosts = () => this.props.getPostsRequest();

  renderRow = ({ item }) => (
    <ListItem
      avatar={<Avatar photoURL={item.user.photoURL} size="small" />}
      hideChevron
      subtitle={item.user.username}
      title={item.content}
      titleNumberOfLines={0}
    />
  );

  render() {
    const {
      error,
      isAddPostLoading,
      isGetPostsLoading,
      post,
      posts,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ErrorComponent show={!!error}>{error}</ErrorComponent>
        <FlatList
          data={posts}
          extraData={isGetPostsLoading}
          keyExtractor={item => item.id}
          ListHeaderComponent={(
            <TextInput
              blurOnSubmit
              isLoading={isAddPostLoading}
              onChangeText={this.onChangePost}
              onSubmitEditing={this.onPost}
              placeholder={i18n.t('POST.WHATS_UP')}
              returnKeyType="send"
              value={post}
            />
          )}
          onRefresh={this.fetchPosts}
          refreshing={isGetPostsLoading}
          renderItem={this.renderRow}
        />
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
