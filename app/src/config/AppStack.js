// @flow
import * as React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import DrawerContent from '@config/DrawerContent';
import HomeScreen from '@containers/home/HomeScreen';
import ProfileScreen from '@containers/profile/ProfileScreen';
import SecurityScreen from '@containers/security/SecurityScreen';

export default createDrawerNavigator({
  Home: createStackNavigator({
    HomeScreen,
    AddPicture: HomeScreen,
  }),

  Profile: createStackNavigator({
    ProfileScreen,
  }),

  Security: createStackNavigator({
    SecurityScreen,
  }),
}, {
  contentComponent: props => <DrawerContent {...props} />,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});
