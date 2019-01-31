import Route from '@ember/routing/route';
import $ from 'jquery';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Route.extend(AuthenticatedRouteMixin, {
  classNames: ['page-header-fixed', 'page-sidebar-closed-hide-logo', 'page-content-white', 'page-boxed', 'page-md'],
  authenticationRoute: 'lang.login',

  intl: service(),

  afterModel(params) {
    const lang = this._selectLang(params);
    this.intl.setLocale(lang); /* array optional */
    $('html').attr('lang', lang);
  },

  _selectLang(params) {
    const { allowedLocales, defaultLocale } = config.intl;
    const lang = params && params.lang && allowedLocales.indexOf(params.lang) > -1 ? params.lang : defaultLocale; // eslint-disable-line
    return lang;
  },
});
