import Component from '@ember/component';
import { inject as service } from '@ember/service';
import mLayout from 'metronic-layout';

export default Component.extend({
  session: service('session'),

  tagName: 'header',
  classNames: ['m-grid__item', ' m-header'],

  didRender() {
    mLayout.initHeader();
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
  },
});
