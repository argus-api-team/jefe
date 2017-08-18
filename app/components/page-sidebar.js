import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['page-sidebar-wrapper'],

  didRender() {
    this.$('.active').closest('.nav-item').addClass('active');
    this.$('.active').closest('.top-level').addClass('active');
  }
});
