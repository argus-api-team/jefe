import DS from 'ember-data';

export default DS.Model.extend({
  matchings: DS.hasMany({ async: true }),
  candidates: DS.hasMany({ async: true }),
  registrationCard: DS.hasMany({ async: true }),
  vehicles: DS.hasMany({ async: true }),
});
