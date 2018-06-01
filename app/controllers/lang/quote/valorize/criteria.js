import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isExtendedValue: computed('model.valorization.offer', function () {
    return this.get('model.valorization.offer') === 'extended-market-value';
  }),
  showSummaryGaragePart: computed.or('garageMakes', 'model.valorization.geolocalisation'),
  showSummaryUsage: computed.or('model.valorization.{mileage,calculatedFor,returnedAt}'),
  actions: {
    validateForm() {
      const valorization = this.get('model.valorization');
      valorization.save();
    },
  },
});
