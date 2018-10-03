import Route from '@ember/routing/route';
import config from '../config/environment';

export default Route.extend({
  beforeModel() {
    this.transitionTo('lang', { lang: this._selectLang() });
  },

  _selectLang() {
    const { allowedLocales, defaultLocale } = config.i18n;
    let setLanguage = defaultLocale;
    if (navigator.languages) {
      navigator.languages.some((lang) => {
        if (allowedLocales.indexOf(lang) > -1) {
          setLanguage = lang;
          return true;
        }
        return false;
      });
    } else if (navigator.language) {
      setLanguage = navigator.language;
    } else if (navigator.userLanguage) {
      setLanguage = navigator.userLanguage;
    }
    return setLanguage;
  },
});
