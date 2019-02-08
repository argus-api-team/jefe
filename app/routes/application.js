import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import config from '../config/environment';

export default Route.extend(ApplicationRouteMixin, {
  classNames: ['page-header-fixed', 'page-sidebar-closed-hide-logo', 'page-content-white', 'page-boxed', 'page-md'],
  authenticationRoute: 'login',

  intl: service(),

  beforeModel() {
    const lang = this._selectLang();
    this.intl.setLocale(lang); /* array optional */
    $('html').attr('lang', lang);
  },

  _selectLang() {
    const { allowedLocales, defaultLocale } = config.intl;
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
