import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  registration: [
    validator('presence', {
      presence: true,
      description: 'Registration number',
    }),
    validator('registration-number'),
  ],
});

export default DS.Model.extend(Validations, {
  registration: DS.attr('string'),
  offer: DS.attr('string'),

  registrationCard: DS.belongsTo({ async: true }),
  candidates: DS.hasMany({ async: true }),
  vehicle: DS.belongsTo({ async: true }),
  order: DS.belongsTo({ async: true }),
});
