import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      valorization: this.modelFor('lang.quote.valorize'),
      featureCategories: this.store.query('featureCategory', { page: { size: 500 } }),
      makes: this.store.query('make', {
        page: { size: 500 },
        sort: 'name',
      }),
    });
  },

  beforeModel() {
    const valorizationRecord = this.modelFor('lang.quote.valorize');
    if (!valorizationRecord.get('offer')) {
      this.transitionTo('lang.quote.valorize.offer');
    }
  },
});
