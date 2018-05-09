import DS from 'ember-data';

export default DS.Model.extend({
  subtype: DS.attr('string'),
  label: DS.attr('string'),
  value: DS.attr('number'),
  message: DS.attr('string'),
  mileage: DS.attr('number'),
  dispersion: DS.attr('number'),
  releasedAt: DS.attr('date'),
  internMessage: DS.attr('string'),
  confidenceIntervals: DS.attr(),
});
