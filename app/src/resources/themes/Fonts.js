import Metrics from './Metrics';

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 14,
  regular: 17,
  title: 16,
  medium: 14,
  small: 12,
  tiny: 8.5,
  avatar: 30,
  extraText: 14,
  chatInputSize: 13,
  avatarName: 10,
  notification: Metrics.mediumAndDown ? 14 : 16,
};

const type = {
  base: 'Verdana',
  bold: 'Verdana-Bold',
  emphasis: 'Verdana-BoldItalic',
  baseLight: 'Verdana-Light',
  semiBold: 'Verdana-SemiBold',
  semiBoldItalic: 'Verdana-SemiBoldItalic',
  lightItalic: 'Verdana-LightItalic',
};

const Fonts = {
  size,
  type,
};

export default Fonts;
