import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    viewMake(make) {
      this.transitionToRoute('lang.make', make)
    }
  }
});
