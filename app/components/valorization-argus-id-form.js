import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { debounce } from '@ember/runloop';

export default Component.extend({
  store: service(),
  router: service(),

  // Html element properties
  tagName: 'form',

  // States var
  argusOID: '',
  noOidMatch: false,
  isSearching: false,
  resolvedVersion: null,
  vehicleDate: null,

  // Events
  didRender() {
    const argusOID = this.get('argusOID');
    if (argusOID) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  },

  submit(e) {
    e.preventDefault();
    const resolvedVersion = this.get('resolvedVersion');
    const valorizationRecord = this.get('valorizationRecord');
    const vehicleDate = this.get('vehicleDate');
    const router = this.get('router');
    valorizationRecord.set('version', resolvedVersion);
    valorizationRecord.set('releasedAt', vehicleDate);
    router.transitionTo('data-set.quote.valorize.offer');
  },

  // Methods
  resolveArgusOID() {
    const argusOID = this.get('argusOID');
    const store = this.get('store');
    this.set('isSearching', true);
    this.set('vehicleDate', null);
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

  // Observe oid input value
  didReceiveAttrs() {
    this.resetStates();
    debounce(this, this.resolveArgusOID, 500);
  },

});
