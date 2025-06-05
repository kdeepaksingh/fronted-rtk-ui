import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en.json";

const resources = {
  en: {
    translation: translationEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  supportedLngs: ["en"], 
  debug: false,
  interpolation: {
    escapeValue: false, 
    skipOnVariables: false,
  },
  react: {
    useSuspense: true,
  },
  detection: {
    order: ["querystring", "cookie", "localStorage", "navigator"],
    caches: ["localStorage", "cookie"],
  },
});

export default i18n;
