import { createSwitchNavigator } from 'react-navigation';
import Auth from '@config/AuthStack';
import App from '@config/AppStack';

export default createSwitchNavigator({
  Auth,
  App,
}, {
  initialRouteName: 'Auth',
});
