import Route from '@ember/routing/route';
import { computed } from '@ember/object';

export default Route.extend({
  model(params) {
    return this.store.peekRecord('phase', params.phase_id).query('versions', {
      include: this.get('includedRelationship'),
      meta: {
        filterable: false,
      },
      page: { size: 500 },
    });
  },
  renderTemplate(controller, model) {
    this.render('lang.referential.model.generation.phase', {
      into: 'lang.referential.model',
      outlet: 'versions',
      model,
    });
  },

  includedRelationship: computed('', function () { // eslint-disable-line
    const includedRelationship = [
      'periods.engine',
      'periods.transmission',
      'energy',
      'gearbox',
    ].join(',');
    return includedRelationship;
  }),
});
