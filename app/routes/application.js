import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import config from '../config/environment';

export default Route.extend(ApplicationRouteMixin, {
  classNames: ['page-header-fixed', 'page-sidebar-closed-hide-logo', 'page-content-white', 'page-boxed', 'page-md'],
  authenticationRoute: 'login',

  intl: service(),
  session: service(),
  userSettings: service(),

  beforeModel() {
    let locale = this._selectLocale();
    if (this.session.get('isAuthenticated')) {
      ({ locale } = this.userSettings.userSettings);
    }
    this.intl.setLocale(locale); /* array optional */
    $('html').attr('locale', locale);
  },

  _selectLocale() {
    const { allowedLocales, defaultLocale } = config.intl;
    let setLanguage = defaultLocale;
    if (navigator.languages) {
      navigator.languages.some((locale) => {
        if (allowedLocales.indexOf(locale) > -1) {
          setLanguage = locale;
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
