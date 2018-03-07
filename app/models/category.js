import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  makes: DS.hasMany({ async: true }),
  models: DS.hasMany({ async: true }),
  submodels: DS.hasMany({ async: true }),
});
