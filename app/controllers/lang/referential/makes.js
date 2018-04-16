import Controller from '@ember/controller';

export default Controller.extend({
  letter: 'all',
  queryParams: ['letter'],

  actions: {
    updateLetter(letter) {
      this.set('letter', letter);
    },
  },
});
