import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import mLayout from 'metronic-layout';

export default Component.extend({
  router: service(),
  elementId: 'm_aside_left',
  classNames: ['page-sidebar-wrapper', 'm-grid__item', 'm-aside-left', 'm-aside-left--skin-dark'],
  activeSideMenuClass: 'm-menu__item--expanded m-menu__item--active',

  didRender() {
    this.$('.active').closest('.nav-item').removeClass('active');
    this.$('.active').closest('.top-level').removeClass('active');

    this.$('.active').closest('.nav-item').addClass('active');
    this.$('.active').closest('.top-level').addClass('active');
    mLayout.initAside();
    // console.log(mLayout);
  },

  homeIsActive: computed('router.currentRouteName', function () {
    return this.get('router.currentRouteName') === 'lang.index';
  }),

  referentialIsActive: computed('router.currentRouteName', function () {
    return this.get('router.currentRouteName').indexOf('lang.referential') === 0;
  }),

  quoteIsActive: computed('router.currentRouteName', function () {
    return this.get('router.currentRouteName').indexOf('lang.quote') === 0;
  }),

  licensePlateIsActive: computed('router.currentRouteName', function () {
    return this.get('router.currentRouteName').indexOf('lang.license-plate') === 0;
  }),
});
