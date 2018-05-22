import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    selectOffer(offer) {
      const valorizationRecord = this.modelFor('lang.quote.valorize');
      valorizationRecord.set('offer', offer);
      this.transitionTo('lang.quote.valorize.criteria');
    },
  },
});
