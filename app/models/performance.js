import DS from 'ember-data';

export default DS.Model.extend({
  da01000m: DS.attr('string'),
  da0100kph: DS.attr('string'),
  maximumSpeed: DS.attr('string'),
});
