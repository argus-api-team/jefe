import Controller from '@ember/controller';
import { computed } from '@ember/object';
import DS from 'ember-data';

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
