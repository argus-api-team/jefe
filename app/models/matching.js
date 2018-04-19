import DS from 'ember-data';

export default DS.Model.extend({
  registration: DS.attr('string'),

  registrationCard: DS.belongsTo({ async: true }),
  candidates: DS.hasMany({ async: true }),
  vehicles: DS.belongsTo({ async: true }),
  orders: DS.belongsTo({ async: true }),
});
