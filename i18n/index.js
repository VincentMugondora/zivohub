import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

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
    // Use expo-localization to get the device locale
    const locale = Localization.locale ? Localization.locale.split('-')[0] : 'en';
    cb(locale);
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