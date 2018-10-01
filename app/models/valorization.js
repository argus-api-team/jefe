import DS from 'ember-data';
import { computed, observer } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  mileage: [
    validator('presence', true),
    validator('format', { regex: /^\d{1,}$/ }),
  ],
  calculatedFor: [
    validator('presence', {
      presence: true,
      disabled: computed.not('model.needCalculatedFor'),
    }),
  ],
  returnedAt: [
    validator('presence', {
      presence: true,
      disabled: computed.not('model.isPrevar'),
    }),
  ],
});

export default DS.Model.extend(Validations, {

  isComputing: false,

  // Required
  offer: DS.attr('string'),
  mileage: DS.attr('number'),
  releasedAt: DS.attr('date'),
  businessTarget: DS.attr('string'),
  // Custom, Past, exchange
  calculatedFor: DS.attr('date'),

  // Prevar
  returnedAt: DS.attr('date'),

  // Extended
  geolocalisation: DS.attr('string'),
  makes: DS.attr('string'),

  order: DS.belongsTo({ async: true }),
  values: DS.hasMany({ async: true }),

  version: DS.belongsTo(),
  features: DS.hasMany(),


  // Computed properties to handle needed attr with the selected offer
  needCalculatedFor: computed('offer', function () {
    return this.get('offer').indexOf('past-') !== -1;
  }),
  isPrevar: computed('offer', function () {
    return this.get('offer') === 'prevar-value';
  }),
  isExtended: computed('offer', function () {
    return this.get('offer') === 'extended-market-value';
  }),
  isPastValue: computed('offer', function () {
    return this.get('offer').indexOf('past-') !== -1;
  }),
  isPartExchange: computed('offer', function () {
    return this.get('offer') === 'part-exchange-value';
  }),
  isCustomMarketValue: computed('offer', function () {
    return this.get('offer') === 'custom-market-value';
  }),
  isAutovisual: computed('offer', function () {
    return this.get('offer').indexOf('autovisual') !== -1;
  }),
  mainValue: computed('values.length', 'offer', function () {
    let mainValueSubtype;
    return DS.PromiseObject.create({
      promise: this.get('values')
        .then((values) => {
          if (this.get('isPastValue')) {
            mainValueSubtype = 'past-market-values';
          } else if (this.get('isPrevar')) {
            mainValueSubtype = 'prevar-values';
          } else if (this.get('isPartExchange')) {
            mainValueSubtype = 'part-exchange-values';
          } else {
            mainValueSubtype = 'custom-market-values';
          }
          return values.findBy('subtype', mainValueSubtype);
        }),
    });
  }),
  showSummaryGaragePart: computed.or('garageMakes', 'geolocalisation'),

  // Observer to handle some events
  resetOptions: observer('version', function () {
    this.set('features', []);
  }),

  initialPricesValue: computed('values.length', function () {
    return this._getSpecificValue('initial-prices');
  }),
  customMarketValues: computed('values.length', function () {
    return this._getSpecificValue('custom-market-values');
  }),
  displayedValue: computed('values.length', function () {
    return this._getSpecificValue('displayed-selling-values');
  }),
  btocValue: computed('values.length', function () {
    return this._getSpecificValue('btoc-transaction-values');
  }),
  btobValue: computed('values.length', function () {
    return this._getSpecificValue('btob-transaction-values');
  }),
  refurbishmentCosts: computed('values.length', function () {
    return this._getSpecificValue('expected-refurbishment-costs');
  }),
  pastMarketValues: computed('values.length', function () {
    return this._getSpecificValue('past-market-values');
  }),
  prevarValues: computed('values.length', function () {
    return this._getSpecificValue('prevar-values');
  }),
  exchangeValues: computed('values.length', function () {
    return this._getSpecificValue('part-exchange-values');
  }),
  _getSpecificValue(subtype) {
    return DS.PromiseObject.create({
      promise: this.get('values').then(values => values.findBy('subtype', subtype)),
    });
  },

  vehicle: computed('version', function () {
    const store = this.get('store');
    const versionId = this.belongsTo('version').id();
    if (!versionId) { return null; }
    return DS.PromiseObject.create({
      promise: store.findRecord('version', versionId, {
        include: 'make,submodel,generation,phase',
      }).then(version => version)
        .catch(() => null),
    });
  }),
});
