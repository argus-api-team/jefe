import DS from 'ember-data';

export default DS.Model.extend({
  grossCombinedRating: DS.attr('number'),
  grossVehicleRating: DS.attr('number'),
  kerbweight: DS.attr('number'),
  kerbweightIncludingDriver: DS.attr('number'),
  payload: DS.attr('number'),
  unbrakedTrailer: DS.attr('number'),
});
