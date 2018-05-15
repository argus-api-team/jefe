import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { debounce } from '@ember/runloop';
import { observer } from '@ember/object';

export default Component.extend({
  // Inject service
  store: service(),

  // Html element properties
  tagName: 'form',

  // States var
  argusOID: '',
  noOidMatch: false,
  isSearching: false,
  resolvedVersion: null,
  vehicleDate: null,

  // Methods
  resolveArgusOID() {
    const argusOID = this.get('argusOID');
    const store = this.get('store');
    if (argusOID) {
      store.findRecord('version', argusOID, {
        include: 'make,phase,generation',
      }).then((versionRecord) => {
        this.set('resolvedVersion', versionRecord);
      }).catch(() => {
        this.set('noOidMatch', true);
      }).finally(() => {
        this.set('isSearching', false);
      });
    } else {
      this.resetStates();
    }
  },

  resetStates() {
    this.set('noOidMatch', false);
    this.set('isSearching', false);
    this.set('resolvedVersion', null);
  },

  // Event handling
  argusOIDObserver: observer('argusOID', function () {
    this.resetStates();
    this.set('isSearching', true);
    this.set('vehicleDate', null);
    debounce(this, this.resolveArgusOID, 500);
  }),
});
