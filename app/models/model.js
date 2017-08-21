import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  legacyId: DS.attr('number'),
  positionQuote: DS.attr('number'),
  make: DS.belongsTo('make', { async: true }),
  submodels: DS.hasMany({ async: true }),
});
