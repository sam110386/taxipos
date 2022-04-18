import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import lang_fr from "./translations/fr/common.json";
import lang_en from "./translations/en/common.json";
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: lang_en,
  },
  fr: {
    translation: lang_fr,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
