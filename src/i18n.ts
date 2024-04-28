import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Roll": "Roll",
      "Menu": "Menu",
      "Reset": "Reset",
      "Seed": "Seed",
      "Range": "Range",
      "Settings": "Settings",
      "About": "About",
      "CopiedToClipboard": "Copied to clipboard.",
    }
  }
};

i18next.use(initReactI18next).init({
  resources: resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  }
});
