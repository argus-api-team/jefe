import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service('session'),

  classNames: ['page-header','navbar','navbar-fixed-top'],

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
