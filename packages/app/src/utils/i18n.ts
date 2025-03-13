import i18n, { use } from "i18next"
import { initReactI18next } from "react-i18next"

import translationEN from "#assets/locales/en/common.json"

const languages = ["en"]

const resources = {
  en: {
    translation: translationEN,
  },
}

use(initReactI18next)
  .init({
    resources,
    lng: languages[0],
    fallbackLng: languages,
  })
  .then(() => {})
  .catch(() => {})

export default i18n
