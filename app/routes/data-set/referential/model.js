import Route from '@ember/routing/route';
import { computed } from '@ember/object';

export default Route.extend({
  model(params) {
    return this.store.findRecord('submodel', params.id, {
      include: this.get('includedRelationship'),
      reload: true,
      meta: {
        filterable: false,
      },
    });
  },
  includedRelationship: computed('', function () { // eslint-disable-line
    const includedRelationship = [
      'make',
      'generations.phases',
    ].join(',');
    return includedRelationship;
  }),
});
