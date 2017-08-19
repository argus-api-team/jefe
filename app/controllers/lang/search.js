import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    viewMake(make) {
      console.log(this.get('i18n.locale'))
      this.transitionToRoute('lang.make', make)
    }
  }
});
