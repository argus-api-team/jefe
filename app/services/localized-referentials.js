import Service from '@ember/service';

export default Service.extend({

  dataSetPrefix: '',

  RSIReferentials: Object.freeze([
    {
      label: 'France',
      labelKey: 'referentialSelector.countries.fr',
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
      labelKey: 'referentialSelector.countries.ma',
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
      labelKey: 'referentialSelector.countries.ci',
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
      labelKey: 'referentialSelector.countries.be',
      prefix: 'be',
      flag: 'be',
      langs: [
        {
          label: 'Anglais',
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Français',
          labelKey: 'referentialSelector.langs.fr',
          prefix: 'fr',
          flag: 'fr',
        },
      ],
    },
    {
      label: 'Espagne',
      labelKey: 'referentialSelector.countries.es',
      prefix: 'es',
      flag: 'es',
      langs: [
        {
          label: 'Anglais',
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Espagnol',
          labelKey: 'referentialSelector.langs.es',
          prefix: 'es',
          flag: 'es',
        },
      ],
    },
    {
      label: 'Portugal',
      labelKey: 'referentialSelector.countries.pt',
      prefix: 'pt',
      flag: 'pt',
      langs: [
        {
          label: 'Anglais',
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Portugais',
          labelKey: 'referentialSelector.langs.pt',
          prefix: 'pt',
          flag: 'pt',
        },
      ],
    },
    {
      label: 'Roumanie',
      labelKey: 'referentialSelector.countries.ro',
      prefix: 'ro',
      flag: 'ro',
      langs: [
        {
          label: 'Anglais',
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
        {
          label: 'Roumain',
          labelKey: 'referentialSelector.langs.ro',
          prefix: 'ro',
          flag: 'ro',
        },
      ],
    },
  ]),
});
