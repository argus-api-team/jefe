import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  classNames: ['page-header','navbar','navbar-fixed-top'],

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  },

  didRender() {
    this._super(...arguments);
    App.init(); // init metronic core componets
    Layout.init(); // init layout
    QuickSidebar.init()
  }
});
