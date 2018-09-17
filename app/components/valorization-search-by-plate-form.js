import Component from '@ember/component';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  router: service(),

  selectedVersion: null,

  resetSelectedVehicle: observer('matchingRecord', function () {
    this.set('selectedVersion', null);
  }),

  actions: {
    validateVehicle() {
      const valorizationRecord = this.get('valorizationRecord');
      const matchingRecord = this.get('matchingRecord');
      const selectedVersion = this.get('selectedVersion');
      const router = this.get('router');
      valorizationRecord.set('version', selectedVersion);
      matchingRecord.get('registrationCard').then((registrationCard) => {
        const firstRegistrationDate = registrationCard.get('firstRegistrationDate');
        valorizationRecord.set('releasedAt', firstRegistrationDate);
        router.transitionTo('lang.quote.valorize.offer');
      });
    },
  },
});
