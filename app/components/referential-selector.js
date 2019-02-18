import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),
  localizedReferentials: service(),

  tagName: 'li',
  classNames: [
    'm-nav__item',
    'm-topbar__notifications',
    'm-topbar__notifications--img',
    'm-dropdown',
    'm-dropdown--large',
    'm-dropdown--arrow',
    'm-dropdown--align-right',
    'm-dropdown--mobile-full-width',
    'referential-selector',
  ],

  attributeBindings: ['data-dropdown-toggle', ' m-dropdown-persistent'],

  actions: {
    changeOriginCountry(country) {
      if (country.langs.length === 1) {
        this.changeReferential(country, country.langs[0]);
      } else {
        this.set('pendingCountry', country);
      }
      return false;
    },

    chooseLang(country, choosenLang) {
      this.changeReferential(country, choosenLang);
    },

    resetPendingCountry() {
      this.set('pendingCountry', null);
    },
  },

  changeReferential(country, lang) {
    const router = this.get('router');
    const dataSet = `${country.prefix}-${lang.prefix}`;
    router.transitionTo('data-set', dataSet);
    this.send('resetPendingCountry');
  },

  pendingCountry: null,

});
