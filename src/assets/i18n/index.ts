import { createI18n } from 'vue-i18n'
import enUS from './en-us.json'
import idID from './id-id.json'

type MessageSchema = typeof enUS

const i18n = createI18n<[MessageSchema], 'en-US' | 'id-ID'>({
  legacy: false,
  locale: navigator.language.includes('id-ID') ? 'id-ID' : 'en-US',
  fallbackLocale: 'en-US',
  globalInjection: true,
  messages: {
    'en-US': enUS,
    'id-ID': idID
  }
})

export default i18n
