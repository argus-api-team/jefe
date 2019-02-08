import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),
  ably: service(),

  showSummaryGaragePart: computed.or('garageMakes', 'model.valorization.geolocalisation'),
  showSummaryUsage: computed.or('model.valorization.{mileage,calculatedFor,returnedAt}'),
  actions: {
    validateForm() {
      const valorization = this.get('model.valorization');
      const router = this.get('router');
      this.get('ably'); // Init ably service
      if (valorization.get('isSaving')) {
        return;
      }
      valorization.save().then((valorizationRecord) => {
        valorizationRecord.set('isComputing', true);
        router.transitionTo('data-set.quote.valorization', valorizationRecord.get('id'));
      });
    },
  },
});
