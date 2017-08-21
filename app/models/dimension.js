import DS from 'ember-data';

export default DS.Model.extend({
  dragCoefficent: DS.attr('number'),
  frontOverhang: DS.attr('number'),
  frontTrack: DS.attr('number'),
  fuelTankCapacity: DS.attr('number'),
  height: DS.attr('number'),
  heightIncludingRoofRails: DS.attr('number'),
  length: DS.attr('number'),
  rearOverhang: DS.attr('number'),
  rearTrack: DS.attr('number'),
  wheelBase: DS.attr('number'),
  width: DS.attr('number')
});
