import Route from '@ember/routing/route';
import { computed } from '@ember/object';

export default Route.extend({
  model(params) {
    return this.store.findRecord('submodel', params.id, {
      include: this.get('includedRelationship'),
      reload: true,
    });
  },
  includedRelationship: computed('', function () { // eslint-disable-line
    const includedRelationship = [
      'make',
      // 'generations.phases.versions',
      // 'periods',
      // 'periods.engine',
      'versions.energy',
      'versions.gearbox',
      'versions.generation',
      'versions.phase',
      // 'periods.transmission',
    ].join(',');
    return includedRelationship;
  }),
});
