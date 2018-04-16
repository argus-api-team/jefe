import DS from 'ember-data';

export default DS.Model.extend({
  capacity: DS.attr('number'),
  loadStillHeight: DS.attr('number'),
  minimumCapacity: DS.attr('number'),
  maximumCapacity: DS.attr('number'),
  maximumlength: DS.attr('number'),
  usableWidth: DS.attr('number'),
  usableLength: DS.attr('number'),
  thirdRowCapacity: DS.attr('number'),
});
