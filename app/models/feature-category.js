import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  equipments: DS.hasMany({ async: true }),
  packs: DS.hasMany({ async: true }),
});
