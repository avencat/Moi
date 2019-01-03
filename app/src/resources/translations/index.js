// @flow
import i18n from 'i18n-js';
import RNLanguages from 'react-native-languages';
import en from '@resources/translations/en';
import fr from '@resources/translations/fr';

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { en, fr };

export default i18n;
