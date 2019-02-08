import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    const valorizationRecord = this.modelFor('data-set.quote.valorize');
    valorizationRecord.get('version').then((versionRecord) => {
      if (!versionRecord || !valorizationRecord.get('releasedAt')) {
        this.transitionTo('data-set.quote.valorize');
      }
    });
  },
  actions: {
    selectOffer(offer) {
      const valorizationRecord = this.modelFor('data-set.quote.valorize');
      valorizationRecord.set('offer', offer);
      this.transitionTo('data-set.quote.valorize.criteria');
    },
  },
});
