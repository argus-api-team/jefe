import Controller from '@ember/controller';

export default Controller.extend({
  letter: 'a',
  queryParams: ['letter'],

  actions: {
    viewMake(make) {
      this.transitionToRoute('lang.make', make);
    },

    updateLetter(letter) {
      this.set('letter', letter);
    },
  },
});
