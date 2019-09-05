import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  legacyId: DS.attr('number'),
  priceExcludingVat: DS.attr('number'),
  priceIncludingVat: DS.attr('number'),
  manufacturerSpec: DS.attr('string'),

  featureCategory: DS.belongsTo({ async: true }),
  periods: DS.hasMany({
    async: true,
    inverse: null,
  }),
});
