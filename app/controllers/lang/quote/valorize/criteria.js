import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    validateForm() {
      const valorization = this.get('model.valorization');
      // let calculatedFor = valorization.get('calculatedFor');
      // if (calculatedFor) {
      //   calculatedFor = calculatedFor.format('YYYY-MM-DD');
      //   valorization.set('calculatedFor', valorization)
      // }
      // let returnedAt = valorization.get('returnedAt');
      // if (returnedAt) {
      //   returnedAt = returnedAt.format('YYYY-MM-DD');
      //   valorization.set('returnedAt', returnedAt)
      // }
      // let releasedAt = valorization.get('releasedAt');
      // releasedAt = releasedAt.format('YYYY-MM-DD');
      // valorization.set('releasedAt', releasedAt)
      valorization.save();
    },
  },
});
