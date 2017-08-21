import DS from 'ember-data';

export default DS.Model.extend({
  chassisMaterial: DS.attr('string'),
  chassisType: DS.attr('string'),
  frontSuspension: DS.attr('string'),
  powerSteering: DS.attr('string'),
  powerSteeringAssistance: DS.attr('string'),
  powerSteeringType: DS.attr('string'),
  rearSuspensionType: DS.attr('string'),
  steeringWheelLockToLockTurns: DS.attr('string'),
  turningCircleBetweenKerbs: DS.attr('string'),
  turningCircleWallToWall: DS.attr('string'),
});
