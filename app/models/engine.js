import DS from 'ember-data';

export default DS.Model.extend({
  boreAndStroke: DS.attr('string'),
  compressionRatio: DS.attr('string'),
  dinHorsepower: DS.attr('string'),
  acronym: DS.attr('string'),
  configuration: DS.attr('string'),
  cubicCapacity: DS.attr('string'),
  fullNicename: DS.attr('string'),
  layout: DS.attr('string'),
  literCapacity: DS.attr('string'),
  marketName: DS.attr('string'),
  supply: DS.attr('string'),
  fiscalHorsepower: DS.attr('string'),
  injectionSystem: DS.attr('string'),
  kilowatt: DS.attr('string'),
  maxPowerRpm: DS.attr('string'),
  maxTorqueRpm: DS.attr('string'),
  numberOfValves: DS.attr('string'),
  powerMarketName: DS.attr('string'),
  standardEmission: DS.attr('string'),
  torque: DS.attr('string'),

  energy: DS.belongsTo({ async: true }),
});
