import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {

  model() {
    return RSVP.hash({
      valorization: this.modelFor('data-set.quote.valorize'),
      featureCategories: this.store.query('featureCategory', { page: { size: 500 } }),
      makes: this.store.query('make', {
        page: { size: 500 },
        sort: 'name',
      }),
    });
  },

  beforeModel() {
    const valorizationRecord = this.modelFor('data-set.quote.valorize');
    if (!valorizationRecord.get('offer')) {
      this.transitionTo('data-set.quote.valorize.offer');
    }
  },
});
