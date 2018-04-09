import DS from 'ember-data';

export default DS.Model.extend({
  boreAndStroke: DS.attr('string'),
  compressionRatio: DS.attr('string'),
  dinHorsepower: DS.attr('number'),
  acronym: DS.attr('string'),
  configuration: DS.attr('string'),
  cubicCapacity: DS.attr('number'),
  fullNicename: DS.attr('string'),
  layout: DS.attr('string'),
  literCapacity: DS.attr('number'),
  marketName: DS.attr('string'),
  supply: DS.attr('string'),
  fiscalHorsepower: DS.attr('number'),
  injectionSystem: DS.attr('string'),
  kilowatt: DS.attr('number'),
  maxPowerRpm: DS.attr('number'),
  maxTorqueRpm: DS.attr('number'),
  numberOfValves: DS.attr('number'),
  powerMarketName: DS.attr('string'),
  standardEmission: DS.attr('string'),
  torque: DS.attr('number'),

  energy: DS.belongsTo({ async: true }),
});
