import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    App.init(); // init metronic core componets
    Layout.init(); // init layout
    QuickSidebar.init()
  }
});
