import BaseValidator from 'ember-cp-validations/validators/base';

const licenseNumberFormat = /^[a-zA-Z]{2}\d{3}[a-zA-Z]{2}$/;
const oldLicenseNumberFormat = /^\d{1,4}[a-zA-Z]{1,3}\d{2,3}$/;

const RegistrationNumber = BaseValidator.extend({
  validate(value, options, model /* , attribute */) {
    const i18n = model.get('i18n');
    const licensePlateNumber = value.replace(/-/g, '').replace(/\s/g, '');
    const isCurrentLicenseNumberFormat = licenseNumberFormat.test(licensePlateNumber);
    const isOldLicenseNumberFormat = oldLicenseNumberFormat.test(licensePlateNumber);
    if (!isCurrentLicenseNumberFormat && !isOldLicenseNumberFormat) {
      return i18n.t('licensePlate.form.notValid').string;
    }
    return true;
  },
});

RegistrationNumber.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * [
   *   `model.array.@each.${attribute}` --> Dependent is created on the model's context
   *   `${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
   * ]
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  },
});

export default RegistrationNumber;
