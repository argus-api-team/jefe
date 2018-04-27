import DS from 'ember-data';

export default DS.Model.extend({
  carbonEmission: DS.attr('number'),
  firstRegistrationDate: DS.attr('string'),
  fiscalPower: DS.attr('number'),
  registrationDate: DS.attr('string'),
  vinCode: DS.attr('string'),

  matching: DS.belongsTo({ async: true }),
});
