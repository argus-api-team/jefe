import DS from 'ember-data';

export default DS.Model.extend({
  chassisMaterial: DS.attr('string'),
  chassisType: DS.attr('string'),
  frontSuspension: DS.attr('string'),
  powerSteering: DS.attr('string'),
  powerSteeringAssistance: DS.attr('string'),
  powerSteeringType: DS.attr('string'),
  rearSuspensionType: DS.attr('string'),
  steeringWheelLockToLockTurns: DS.attr('number'),
  turningCircleBetweenKerbs: DS.attr('number'),
  turningCircleWallToWall: DS.attr('number'),
});
