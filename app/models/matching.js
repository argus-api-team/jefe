import DS from 'ember-data';

export default DS.Model.extend({
  registration: DS.attr('string'),
  offer: DS.attr('string'),

  registrationCard: DS.belongsTo({ async: true }),
  candidates: DS.hasMany({ async: true }),
  vehicle: DS.belongsTo({ async: true }),
  order: DS.belongsTo({ async: true }),
});
