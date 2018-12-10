// @flow
import * as React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from '@containers/home/HomeScreen';
import ProfileScreen from '@containers/profile/ProfileScreen';
import DrawerContent from '@config/DrawerContent';

export default createDrawerNavigator({
  Home: createStackNavigator({
    HomeScreen,
    AddPicture: HomeScreen,
  }),

  Profile: createStackNavigator({
    ProfileScreen,
  }),
}, {
  contentComponent: props => <DrawerContent {...props} />,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});
