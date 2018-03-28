import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import mLayout from 'metronic-layout';

export default Component.extend({
  i18n: service(),
  session: service('session'),

  tagName: 'header',
  classNames: ['m-grid__item', ' m-header'],

  locale: computed.alias('i18n.locale'),
  locales: computed.alias('i18n.locales'),

  didRender() {
    mLayout.initHeader();
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
  },
});
