import DS from 'ember-data';

export default DS.Model.extend({
  carbonMonoxide: DS.attr('string'),
  co2EmissionLevel: DS.attr('number'),
  combinedFuel: DS.attr('number'),
  electricRange: DS.attr('number'),
  extraUrbanFuel: DS.attr('number'),
  nitrousOxyde: DS.attr('number'),
  particulateMatter: DS.attr('number'),
  totalHydrocarbons: DS.attr('number'),
  urbanFuel: DS.attr('number'),
});
