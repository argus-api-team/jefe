import Component from '@ember/component';

export default Component.extend({
  didRender() {
    this._super(...arguments);
    App.init(); // init metronic core componets
    Layout.init(); // init layout
    QuickSidebar.init();
  },
});
