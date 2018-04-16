import DS from 'ember-data';

export default DS.Model.extend({
  da01000m: DS.attr('number'),
  da0100kph: DS.attr('number'),
  maximumSpeed: DS.attr('number'),
});
