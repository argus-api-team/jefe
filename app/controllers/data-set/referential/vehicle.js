import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  localizedReferentials: service(),

  queryParams: ['periodId'],
  periodId: null,

  actions: {
    updateSelectedPeriod(selectedPeriod) {
      this.set('selectedPeriod', selectedPeriod);
      this.set('periodId', selectedPeriod.get('id'));
    },
  },
});
