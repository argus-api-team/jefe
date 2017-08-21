import DS from 'ember-data';

export default DS.Model.extend({
  grossCombinedRating: DS.attr('string'),
  grossVehicleRating: DS.attr('string'),
  kerbweight: DS.attr('string'),
  kerbweightIncludingDriver: DS.attr('string'),
  payload: DS.attr('string'),
  unbrakedTrailer: DS.attr('string'),
});
