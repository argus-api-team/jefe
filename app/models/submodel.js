import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  shortNicename: DS.attr('string'),
  fullNicename: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  legacyId: DS.attr('number'),
  make: DS.belongsTo('make', { async: true }),
  model: DS.belongsTo('model', { async: true })
});
