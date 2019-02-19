import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({

  dataSetPrefix: '',
  isFrenchReferential: computed('dataSetPrefix', function () {
    return this.get('dataSetPrefix') === 'fr/fr';
  }),

  RSIReferentials: Object.freeze([
    {
      label: 'France',
      labelKey: 'referentialSelector.countries.fr',
      defautPrefix: 'fr-fr',
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
      defautPrefix: 'ma-fr',
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
      defautPrefix: 'ci-fr',
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
      defautPrefix: 'be-en',
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
      defautPrefix: 'es-en',
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
      defautPrefix: 'pt-en',
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
      defautPrefix: 'ro-en',
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
