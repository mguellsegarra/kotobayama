import * as RNLocalize from 'react-native-localize';

// @ts-ignore
const ca = require('@assets/locales/ca.json');
// @ts-ignore
const es = require('@assets/locales/es.json');

interface translationEntry {
  [index: string]: string;
}

interface translationObject {
  [index: string]: translationEntry;
}

interface I18nInterface {
  defaultLocale: string;
  supportedLocales: Array<string>;
  translations: translationObject;
  locale: string;
  init: Function;
}

const I18n: I18nInterface = {
  defaultLocale: 'ca',
  supportedLocales: ['es', 'ca'],
  translations: {
    ca,
    es,
  },
  locale: '',
  init: () => {
    let locale = RNLocalize.getLocales()[0].languageCode;
    if (I18n.supportedLocales.indexOf(I18n.locale.substring(0, 2)) === -1) {
      locale = I18n.defaultLocale;
    }

    I18n.locale = locale;
  },
};

export default I18n;

export function strings(name: string) {
  if (!I18n.translations) {
    return name;
  }
  if (!I18n.translations[I18n.locale]) {
    return name;
  }
  const stringsForLang = I18n.translations[I18n.locale];
  const t = stringsForLang[name];
  if (!t) {
    return name;
  }
  return stringsForLang[name];
}

export function changeLocale(locale: string) {
  I18n.locale = locale;
}

export function getLocale() {
  return RNLocalize.getLocales()[0].languageCode;
}
