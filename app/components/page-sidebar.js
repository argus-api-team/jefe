import Component from '@ember/component';
import mLayout from 'metronic-layout';

export default Component.extend({

  elementId: 'm_aside_left',
  classNames: ['page-sidebar-wrapper', 'm-grid__item', 'm-aside-left', 'm-aside-left--skin-dark'],

  didRender() {
    this.$('.active').closest('.nav-item').removeClass('active');
    this.$('.active').closest('.top-level').removeClass('active');

    this.$('.active').closest('.nav-item').addClass('active');
    this.$('.active').closest('.top-level').addClass('active');
    mLayout.initAside();
    // console.log(mLayout);
  },
});
