import Mixin from '@ember/object/mixin';
import DS from 'ember-data';

export default Mixin.create({
  name: DS.attr('string'),
  legacyId: DS.attr('number'),
  priceExcludingVat: DS.attr('number'),
  priceIncludingVat: DS.attr('number'),
  manufacturerSpec: DS.attr('string'),

  featureCategory: DS.belongsTo({ async: true }),
  periods: DS.hasMany({ async: true }),
});
