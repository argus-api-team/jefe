import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  code: DS.attr('string'),
  subtype: DS.attr('string'),
  legacyId: DS.attr('number'),
  marketingName: DS.attr('string'),
  numberOfGears: DS.attr('number'),
});
