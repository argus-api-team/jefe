import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),

  tagName: 'li',
  classNames: [
    'm-nav__item',
    'm-topbar__notifications',
    'm-topbar__notifications--img',
    'm-dropdown',
    'm-dropdown--large',
    'm-dropdown--header-bg-fill',
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

  RSIReferentials: Object.freeze([
    {
      label: 'France',
      prefix: 'fr',
      flag: 'fr',
      langs: [
        {
          label: 'Français',
          prefix: 'fr',
          flag: 'fr',
        },
      ],
    },
    {
      label: 'Maroc',
      prefix: 'ma',
      flag: 'ma',
      langs: [
        {
          label: 'Français',
          prefix: 'fr',
          flag: 'ma',
        },
      ],
    },
    {
      label: 'Côte d\'ivoire',
      prefix: 'ci',
      flag: 'ci',
      langs: [
        {
          label: 'Français',
          prefix: 'fr',
          flag: 'ci',
        },
      ],
    },
  ]),

  JatoReferentials: Object.freeze([
    {
      label: 'Belgique',
      prefix: 'be',
      flag: 'be',
      langs: [
        {
          label: 'Anglais',
          prefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Français',
          prefix: 'fr',
          flag: 'fr',
        },
      ],
    },
    {
      label: 'Espagne',
      prefix: 'es',
      flag: 'es',
      langs: [
        {
          label: 'Anglais',
          prefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Espagnol',
          prefix: 'es',
          flag: 'es',
        },
      ],
    },
    {
      label: 'Portugal',
      prefix: 'pt',
      flag: 'pt',
      langs: [
        {
          label: 'Anglais',
          prefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Portugais',
          prefix: 'pt',
          flag: 'pt',
        },
      ],
    },
    {
      label: 'Roumanie',
      prefix: 'ro',
      flag: 'ro',
      langs: [
        {
          label: 'Anglais',
          prefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Roumain',
          prefix: 'ro',
          flag: 'ro',
        },
      ],
    },
  ]),

});
