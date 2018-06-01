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
  resetOptions: observer('version', function () {
    this.set('features', []);
  }),
});
