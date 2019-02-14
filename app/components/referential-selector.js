import Component from '@ember/component';

export default Component.extend({
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
    console.log('changeReferential');
    console.log(country);
    console.log(lang);
    this.send('resetPendingCountry');
  },

  pendingCountry: null,

  RSIReferentials: Object.freeze([
    {
      label: 'France',
      countryPrefix: 'fr',
      flag: 'fr',
      langs: [
        {
          label: 'Français',
          langPrefix: 'fr',
          flag: 'fr',
        },
      ],
    },
    {
      label: 'Maroc',
      countryPrefix: 'ma',
      flag: 'ma',
      langs: [
        {
          label: 'Français',
          langPrefix: 'fr',
          flag: 'ma',
        },
      ],
    },
    {
      label: 'Côte d\'ivoire',
      countryPrefix: 'ci',
      flag: 'ci',
      langs: [
        {
          label: 'Français',
          langPrefix: 'fr',
          flag: 'ci',
        },
      ],
    },
  ]),

  JatoReferentials: Object.freeze([
    {
      label: 'Belgique',
      apiPrefix: 'be',
      flag: 'be',
      langs: [
        {
          label: 'Anglais',
          langPrefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Français',
          langPrefix: 'fr',
          flag: 'fr',
        },
      ],
    },
    {
      label: 'Espagne',
      countryPrefix: 'es',
      flag: 'es',
      langs: [
        {
          label: 'Anglais',
          langPrefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Espagnol',
          langPrefix: 'es',
          flag: 'es',
        },
      ],
    },
    {
      label: 'Portugal',
      countryPrefix: 'pt',
      flag: 'pt',
      langs: [
        {
          label: 'Anglais',
          langPrefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Portugais',
          langPrefix: 'pt',
          flag: 'pt',
        },
      ],
    },
    {
      label: 'Roumanie',
      countryPrefix: 'ro',
      flag: 'ro',
      langs: [
        {
          label: 'Anglais',
          langPrefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Roumain',
          langPrefix: 'ro',
          flag: 'ro',
        },
      ],
    },
  ]),

});
