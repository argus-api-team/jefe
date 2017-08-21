import DS from 'ember-data';

export default DS.Model.extend({
  code: DS.attr('string'),
  name: DS.attr('string'),
  legacyId: DS.attr('number'),
  masterId: DS.attr('number'),
  masterName: DS.attr('string'),
  masterCode: DS.attr('string'),
});
