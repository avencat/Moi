import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Used via Metrics.baseMargin
const Metrics = {
  small: width <= 240,
  medium: width <= 360 && width > 240,
  mediumAndDown: width <= 360,
  mediumAndUp: width > 240,
  large: width <= 540 && width > 360,
  largeAndDown: width <= 540,
  largeAndUp: width > 360,
  xLarge: width > 540,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

export default Metrics;
