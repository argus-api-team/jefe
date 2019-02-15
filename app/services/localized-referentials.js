import Service from '@ember/service';

export default Service.extend({

  dataSetPrefix: '',

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
