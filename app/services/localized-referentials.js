import Service from '@ember/service';
import { computed } from '@ember/object';
import { union } from '@ember/object/computed';

export default Service.extend({

  dataSetPrefix: '',
  isFrenchReferential: computed('dataSetPrefix', function () {
    return this.get('dataSetPrefix') === 'fr/fr';
  }),


  isRsiReferential: computed('dataSetPrefix', 'rsiPrefixes', function () {
    return this.get('rsiPrefixes').includes(this.get('dataSetPrefix'));
  }),
  rsiPrefixes: Object.freeze([
    'fr/fr',
    'ma/fr',
    'ci/fr',
  ]),
  thirdPartiesPrefixes: Object.freeze([
    'be/en',
    'be/fr',
    'de/en',
    'de/de',
    'es/en',
    'es/es',
    'gb/en',
    'pt/en',
    'pt/pt',
    'ro/en',
    'ro/ro',
    'pl/en',
    'pl/pl',
    'bg/bg',
  ]),
  availablePrefixes: union('rsiPrefixes', 'thirdPartiesPrefixes'),


  RSIReferentials: Object.freeze([
    {
      labelKey: 'referentialSelector.countries.fr',
      defautPrefix: 'fr-fr',
      prefix: 'fr',
      flag: 'fr',
      langs: [
        {
          prefix: 'fr',
          flag: 'fr',
        },
      ],
    },
    {
      labelKey: 'referentialSelector.countries.ma',
      defautPrefix: 'ma-fr',
      prefix: 'ma',
      flag: 'ma',
      langs: [
        {
          prefix: 'fr',
          flag: 'ma',
        },
      ],
    },
    {
      labelKey: 'referentialSelector.countries.ci',
      defautPrefix: 'ci-fr',
      prefix: 'ci',
      flag: 'ci',
      langs: [
        {
          prefix: 'fr',
          flag: 'ci',
        },
      ],
    },
  ]),

  ThirdPartiesReferentials: Object.freeze([
    {
      labelKey: 'referentialSelector.countries.de',
      defautPrefix: 'de-en',
      prefix: 'de',
      flag: 'de',
      langs: [
        {
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
        {
          labelKey: 'referentialSelector.langs.de',
          prefix: 'de',
          flag: 'de',
        },
      ],
    },
    {
      labelKey: 'referentialSelector.countries.be',
      defautPrefix: 'be-en',
      prefix: 'be',
      flag: 'be',
      langs: [
        {
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
        {
          labelKey: 'referentialSelector.langs.fr',
          prefix: 'fr',
          flag: 'fr',
        },
      ],
    },
    {
      labelKey: 'referentialSelector.countries.es',
      defautPrefix: 'es-en',
      prefix: 'es',
      flag: 'es',
      langs: [
        {
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
        {
          labelKey: 'referentialSelector.langs.es',
          prefix: 'es',
          flag: 'es',
        },
      ],
    },
    {
      labelKey: 'referentialSelector.countries.pl',
      defautPrefix: 'pl-en',
      prefix: 'pl',
      flag: 'pl',
      langs: [
        {
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
        {
          labelKey: 'referentialSelector.langs.pl',
          prefix: 'pl',
          flag: 'pl',
        },
      ],
    },
    {
      labelKey: 'referentialSelector.countries.pt',
      defautPrefix: 'pt-en',
      prefix: 'pt',
      flag: 'pt',
      langs: [
        {
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
        {
          labelKey: 'referentialSelector.langs.pt',
          prefix: 'pt',
          flag: 'pt',
        },
      ],
    },
    {
      labelKey: 'referentialSelector.countries.ro',
      defautPrefix: 'ro-en',
      prefix: 'ro',
      flag: 'ro',
      langs: [
        {
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
        {
          labelKey: 'referentialSelector.langs.ro',
          prefix: 'ro',
          flag: 'ro',
        },
      ],
    },
    {
      labelKey: 'referentialSelector.countries.gb',
      defautPrefix: 'gb-en',
      prefix: 'gb',
      flag: 'gb',
      langs: [
        {
          labelKey: 'referentialSelector.langs.en',
          prefix: 'en',
          flag: 'gb',
        },
      ],
    },
    {
      labelKey: 'referentialSelector.countries.bg',
      defautPrefix: 'bg-bg',
      prefix: 'bg',
      flag: 'bg',
      langs: [
        {
          labelKey: 'referentialSelector.langs.bg',
          prefix: 'bg',
          flag: 'bg',
        },
      ],
    },
  ]),
});
