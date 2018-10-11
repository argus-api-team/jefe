import Route from '@ember/routing/route';
import { computed } from '@ember/object';

export default Route.extend({
  model(params) {
    const model = {
      submodel: null,
      versions: null,
    };
    return this.store.findRecord('submodel', params.id, {
      include: this.get('includedRelationship'),
      reload: true,
      meta: {
        filterable: false,
      },
    })
      .then((submodel) => {
        model.submodel = submodel;
        return submodel.get('versions');
      })
      .then((versions) => {
        model.versions = versions;
        return model;
      });
  },
  includedRelationship: computed('', function () { // eslint-disable-line
    const includedRelationship = [
      'make',
      'versions.periods.engine',
      'versions.periods.transmission',
      'versions.energy',
      'versions.gearbox',
      'versions.generation',
      'versions.phase',
    ].join(',');
    return includedRelationship;
  }),
});
