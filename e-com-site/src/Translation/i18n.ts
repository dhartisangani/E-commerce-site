import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { TRANSLATIONS_EN } from "./en.web/translation";
import { TRANSLATIONS_GU } from "./ja.web/translation";
export enum Languages {
    EN = "en",
    JA = "ja",
  }
  
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: Languages.EN,
    lng: i18n.language?.toString(),
    // debug: true,
    resources: {
      ja: {
        translation: TRANSLATIONS_GU,
      },
      en: {
        translation: TRANSLATIONS_EN,
      },
    },
  });

export default i18n;
