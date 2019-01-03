// @flow
import * as React from 'react';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

type Props = {
  openDrawer: Function,
};

export default class DrawerButton extends React.PureComponent<Props> {
  render() {
    return (
      <TouchableOpacity style={{ width: 50 }} onPress={() => this.props.openDrawer()}>
        <Icon name="menu" size={24} />
      </TouchableOpacity>
    );
  }
}
