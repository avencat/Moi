import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import en from './en';
import fr from './fr';

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { en, fr };

export default i18n;
