import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';

export default Route.extend({
  model(params) {
    return RSVP.hash({
      vehicle: this.store.findRecord('version', params.id, {
        include: this.get('includedRelationship'),
        reload: true,
      }),
      featureCategories: this.store.findAll('featureCategory'),
    });
  },

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    this.setupPeriodArrayInController(controller, model);
  },

  setupPeriodArrayInController(controller, model) {
    model.vehicle.get('periods').then((periods) => {
      const periodsArray = periods.toArray().sortBy('startDate');
      const queryPeriodId = this.controller.get('periodId');
      controller.set('sortedPeriods', periodsArray);
      if (queryPeriodId) {
        const queryPeriod = periodsArray.findBy('id', queryPeriodId);
        controller.set('selectedPeriod', queryPeriod);
      } else {
        controller.set('selectedPeriod', periodsArray.objectAt(periodsArray.length - 1));
      }
    });
  },

  includedRelationship: computed('', function () { // eslint-disable-line
    const includedRelationship = [
      'make',
      'generation',
      'phase',
      'submodel',
      'periods',
      'periods.dimension',
      'periods.tyre',
      'periods.weight',
      'periods.boot',
      'energy',
      'periods.engine',
      'gearbox',
      'periods.transmission',
      'periods.platform',
      'periods.performance',
      'periods.consumption',
      'periods.standard-equipments.feature-category',
      'periods.optional-equipments.feature-category',
      'periods.standard-packs.feature-category',
      'periods.standard-packs.equipments',
      'periods.optional-packs.feature-category',
      'periods.optional-packs.equipments',
    ].join(',');
    return includedRelationship;
  }),
});
