import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({

  // Generic
  subtype: DS.attr('string'),
  label: DS.attr('string'),
  value: DS.attr('number'),
  mileage: DS.attr('number'),
  calculatedFor: DS.attr('date'),
  releasedAt: DS.attr('date'),

  // Custom market value
  case: DS.attr(),
  influence: DS.attr(),
  standardValue: DS.attr('number'),

  // Prevar Value
  registrationDate: DS.attr('date'),
  returnDate: DS.attr('date'),
  prevarDate: DS.attr('date'),
  initialPrice: DS.attr('number'),
  ratio: DS.attr('number'),

  // Extended Market values
  applicationType: DS.attr(),
  makes: DS.attr(),
  info: DS.attr('string'),
  confidenceIndex: DS.attr('number'),

  // Refurbishment
  confidenceIntervals: DS.attr(),
  dispersion: DS.attr('number'),
  internMessage: DS.attr('string'),
  message: DS.attr('string'),

  // Display
  leeway: DS.attr(),

  confidenceStars: computed('confidenceIndex', function () {
    return this.get('confidenceIndex') / 2;
  }),
});
