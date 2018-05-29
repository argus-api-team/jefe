import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    const valorizationRecord = this.modelFor('lang.quote.valorize');
    valorizationRecord.get('version').then((versionRecord) => {
      if(!versionRecord || !valorizationRecord.get('releasedAt')) {
        this.transitionTo('lang.quote.valorize');
      }
    })
  },
  actions: {
    selectOffer(offer) {
      const valorizationRecord = this.modelFor('lang.quote.valorize');
      valorizationRecord.set('offer', offer);
      this.transitionTo('lang.quote.valorize.criteria');
    },
  },
});
