import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const Validations = buildValidations({
  registration: [
    validator('presence', {
      presence: true,
      descriptionKey: 'licensePlate.form.description',
    }),
    validator('registration-number'),
  ],
});

export default DS.Model.extend(Validations, {
  i18n: service(),

  isSearching: false,

  registration: DS.attr('string'),
  offer: DS.attr('string'),

  registrationCard: DS.belongsTo({ async: true }),
  candidates: DS.hasMany({ async: true }),
  vehicle: DS.belongsTo({ async: true }),
  order: DS.belongsTo({ async: true }),


  licenseNumberFormat: /^[a-zA-Z]{2}\d{3}[a-zA-Z]{2}$/,
  oldLicenseNumberFormat: /^\d{1,4}[a-zA-Z]{1,3}\d{2,3}$/,

  formatedRegistration: computed('registration', function () {
    const licensePlateNumber = this.get('registration').replace(/-/g, '').replace(/\s/g, '').toUpperCase();
    const isCurrentLicenseNumberFormat = this.get('licenseNumberFormat').test(licensePlateNumber);
    const isOldLicenseNumberFormat = this.get('oldLicenseNumberFormat').test(licensePlateNumber);
    if (isCurrentLicenseNumberFormat) {
      return `${licensePlateNumber.slice(0, 2)}-${licensePlateNumber.slice(2, 5)}-${licensePlateNumber.slice(5, 7)}`;
    } else if (isOldLicenseNumberFormat) {
      return this._formatOldRegisration(licensePlateNumber);
    }
    return this.get('registration').toUpperCase();
  }),

  _formatOldRegisration(oldRegistration) {
    let formatedOldRegistration = '';
    oldRegistration.split('').forEach((char, index, string) => {
      formatedOldRegistration += char;
      if (/^\d/.test(char) && !/^\d/.test(string[index + 1])) {
        formatedOldRegistration += ' ';
      } else if (!/^\d/.test(char) && /^\d/.test(string[index + 1])) {
        formatedOldRegistration += ' ';
      }
    });
    return formatedOldRegistration;
  },
});
