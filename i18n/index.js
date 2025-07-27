import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './en.json';
import sn from './sn.json';
import nd from './nd.json';

const resources = {
  en: { translation: en },
  sn: { translation: sn },
  nd: { translation: nd },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => {
    const locales = RNLocalize.getLocales();
    cb(locales && locales.length > 0 ? locales[0].languageCode : 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n; 