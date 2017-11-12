import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  shortNicename: DS.attr('string'),
  fullNicename: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  legacyId: DS.attr('number'),

  make: DS.belongsTo({ async: true }),
  model: DS.belongsTo({ async: true }),
  category: DS.belongsTo({ async: true }),
  generations: DS.hasMany({ async: true }),
  versions: DS.hasMany({ async: true }),
  periods: DS.hasMany({ async: true })
});