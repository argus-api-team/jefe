import EmberRoute from '@ember/routing/route';
import $ from 'jquery';
import config from '../config/environment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default EmberRoute.extend(AuthenticatedRouteMixin, {
  classNames: [
    'page-header-fixed','page-sidebar-closed-hide-logo',
    'page-content-white', 'page-boxed', 'page-md'
  ],
  authenticationRoute: 'lang.login',

  afterModel(params) {
    let lang = this._selectLang(params);

    this.set('i18n.locale', lang);
    $('html').attr('lang', lang);
  },

  _selectLang(params) {
    let allowedLocales = config.i18n.allowedLocales;
    let defaultLocale = config.i18n.defaultLocale;
    let lang = params && params.lang && allowedLocales.indexOf(params.lang) > -1 ? params.lang : defaultLocale;

    return lang;
  }
});
