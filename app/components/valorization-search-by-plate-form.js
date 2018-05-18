import Component from '@ember/component';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  selectedVersion: null,

  resetSelectedVehicle: observer('matchingRecord', function () {
    this.set('selectedVersion', null);
  }),
  actions: {
    validateVehicle() {
      // alert('Validate Vehicle choice');
    },
  },
});
