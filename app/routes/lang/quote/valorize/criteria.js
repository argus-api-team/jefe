import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    const valorization = this.modelFor('lang.quote.valorize');
    return this.store.findAll('featureCategory')
      .then(featureCategories => ({
        valorization,
        featureCategories,
      }));
  },

  beforeModel() {
    const valorizationRecord = this.modelFor('lang.quote.valorize');
    valorizationRecord.set('releasedAt', '2015-11-20');
    valorizationRecord.set('offer', 'extended-market-value');
    this.store.findRecord('version', 1532850).then((placeHolderVersion) => {
      valorizationRecord.set('version', placeHolderVersion);
    });
  },
});
