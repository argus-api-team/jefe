import config from '../config/environment';

export default Ember.Route.extend({
  beforeModel: function () {
    this.transitionTo('lang.index', { lang: this._selectLang() });
  },

  _selectLang: function() {
    var allowedLanguages = config.i18n.allowedLocales;
    var language = config.i18n.defaultLocale;

    if (navigator.languages) {
      for (let lang of navigator.languages) {
        if (allowedLanguages.indexOf(lang) > -1) {
          language = lang;
          break;
        }
      }
    } else {
      if (navigator.language) {
        language = navigator.language;
      } else {
        if (navigator.userLanguage) {
          language = navigator.userLanguage;
        }
      }
    }
    return language;
  }
});