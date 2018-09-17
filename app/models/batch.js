import DS from 'ember-data';

export default DS.Model.extend({
  toProcess: DS.attr(),
  order: DS.belongsTo(),
  matchings: DS.hasMany(),
  valorizations: DS.hasMany(),
});
