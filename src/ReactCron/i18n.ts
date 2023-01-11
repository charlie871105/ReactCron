import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './locales/resource';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
