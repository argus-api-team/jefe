import Component from '@ember/component';

export default Component.extend({
  tagName: 'li',
  classNames: [
    'm-nav__item',
    'm-topbar__notifications',
    'm-topbar__notifications--img',
    'm-dropdown m-dropdown--large',
    'm-dropdown--header-bg-fill',
    'm-dropdown--arrow',
    'm-dropdown--align-right',
    'm-dropdown--mobile-full-width',
    'referential-selector'
  ],

  attributeBindings: ['data-dropdown-toggle', ' m-dropdown-persistent'],

  countries: Object.freeze([
    {
      label: 'France',
      apiPrefix: 'fr/fr',
    },
    {
      label: 'Maroc',
      apiPrefix: 'ma/fr',
    },
    {
      label: 'Côte d\'ivoir',
      apiPrefix: 'ci/fr',
    },
    {
      label: 'Espagne - Anglais',
      apiPrefix: 'es/en',
    },
    {
      label: 'Espagne - Espagnol',
      apiPrefix: 'es/es',
    },
    {
      label: 'Portugal - Anglais',
      apiPrefix: 'pt/en',
    },
    {
      label: 'Portugal - Portuguais',
      apiPrefix: 'pt/pt',
    },
    {
      label: 'Roumanie - Anglais',
      apiPrefix: 'ro/en',
    },
    {
      label: 'Roumanie - Roumain',
      apiPrefix: 'ro/ro',
    },
    {
      label: 'Belgique - Anglais',
      apiPrefix: 'be/en',
    },
    {
      label: 'Belgique - Fr',
      apiPrefix: 'be/fr',
    },


  ]),
});
