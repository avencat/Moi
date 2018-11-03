// @flow
import * as React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

type Props = {};

export default class LoginScreen extends React.Component<Props> {
  render() {
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={someFunction} />
        <FormValidationMessage>Error message</FormValidationMessage>
      </View>
    );
  }
}
