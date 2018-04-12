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
  includedRelationship: computed('', function() {
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
      'periods.optional-packs.equipments'
    ].join(',');
    return includedRelationship
  })
});
