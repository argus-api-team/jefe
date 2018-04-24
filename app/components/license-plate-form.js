import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  ably: service(),
  router: service(),

  tagName: 'form',
  classNames: ['license-plate-form'],
  licensePlateNumber: '',
  licenseNumberFormat: /^[a-zA-Z]{2}\d{3}[a-zA-Z]{2}$/,
  oldLicenseNumberFormat: /^\d{1,4}[a-zA-Z]{1,3}\d{2,3}$/,
  init() {
    this._super(...arguments);
    this.get('ably');
  },
  submit(e) {
    e.preventDefault();
    const licensePlateNumber = this.get('licensePlateNumber').replace(/-/g, '').replace(/\s/g, '');
    const licenseNumberIsValid = this.licenseNumberIsValid(licensePlateNumber);
    const store = this.get('store');
    const router = this.get('router');
    if (!licenseNumberIsValid) {
      return false;
    }
    return store.createRecord('matching', {
      offer: 'identification-by-registration',
      registration: licensePlateNumber,
    }).save().then((matchingRecord) => {
      this.refreshModel();
      if (router.isActive('lang.license-plate')) {
        router.transitionTo('lang.license-plate.matching', matchingRecord.get('id'));
      }
    });
  },

  licenseNumberIsValid(licensePlateNumber) {
    const isCurrentLicenseNumberFormat = this.get('licenseNumberFormat').test(licensePlateNumber);
    const isOldLicenseNumberFormat = this.get('oldLicenseNumberFormat').test(licensePlateNumber);
    return isCurrentLicenseNumberFormat || isOldLicenseNumberFormat;
  },
});