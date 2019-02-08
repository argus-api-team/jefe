import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['periodId'],
  periodId: null,

  actions: {
    updateSelectedPeriod(selectedPeriod) {
      this.set('selectedPeriod', selectedPeriod);
      this.set('periodId', selectedPeriod.get('id'));
    },
  },
});
