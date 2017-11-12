import Ember from 'ember';

export default Ember.Controller.extend({
  letter: 'a',
  queryParams: ['letter'],

  actions: {
    viewMake(make) {
      this.transitionToRoute('lang.make', make);
    },

    updateLetter(letter) {
      this.set('letter', letter);
    }
  }
});
