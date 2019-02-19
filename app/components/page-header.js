import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import mLayout from 'metronic-layout';

export default Component.extend({
  intl: service(),
  session: service(),
  userProfile: service(),

  tagName: 'header',
  classNames: ['m-grid__item', ' m-header'],

  locale: computed.alias('intl.locale'),
  locales: computed.alias('intl.locales'),

  didRender() {
    mLayout.initHeader();
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    updateLocale(locale) {
      this.intl.setLocale(locale);
    },
  },
});
