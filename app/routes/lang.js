import Ember from 'ember';
import config from '../config/environment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  classNames: ['page-header-fixed','page-sidebar-closed-hide-logo', 'page-content-white', 'page-boxed', 'page-md'],
  authenticationRoute: 'lang.login',

  afterModel: function(params) {
    var lang = this._selectLang(params)

    this.set('i18n.locale', lang);
    Ember.$('html').attr('lang', lang)
  },

  _selectLang: function(params) {
    var allowedLocales = config.i18n.allowedLocales;
    var defaultLocale = config.i18n.defaultLocale;
    var lang = params && params.lang && allowedLocales.indexOf(params.lang) > -1 ? params.lang : defaultLocale;

    return lang;
  }
});
