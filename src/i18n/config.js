import i18next from 'i18next'
import locI18next from 'loc-i18next'
import LngDetector from 'i18next-browser-languagedetector'
import I18nXHR from 'i18next-xhr-backend'

const i18n = i18next.use(LngDetector).use(I18nXHR).init({
  fallbackLng: 'en',
  whitelist: ['en', 'ru'],
  preload: ['en', 'ru'],
  ns: 'global',
  defaultNS: 'global',
  fallbackNS: false,
  debug: true,
  detection: {
    order: ['querystring', 'navigator', 'htmlTag'],
    lookupQuerystring: 'lang',
  },
  backend: {
    loadPath: '/i18n/{{lng}}/{{ns}}.json',
  }
}, function(err, t) {
  if (err) return console.error(err)
});

const localize = locI18next.init(i18n, {
  selectorAttr: 'data-i18n',
  optionsAttr: 'i18n-options',
  useOptionsAttr: true
});

export { localize as localize, i18n as i18n }
