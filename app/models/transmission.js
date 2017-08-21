import DS from 'ember-data';

export default DS.Model.extend({
  numberOfGears: DS.attr('string'),
  marketingName: DS.attr('string'),
  drivenWheels: DS.attr('string'),
});
