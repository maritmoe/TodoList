import i18n from "i18next";
import en from "./locales/en/translations.json";
import no from "./locales/no/translations.json";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      translations: en,
    },
    no: {
      translations: no,
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "no"];

export default i18n;
