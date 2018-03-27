import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service('session'),

  tagName:"header",
  classNames: ['m-grid__item', ' m-header'],

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
  },
});
