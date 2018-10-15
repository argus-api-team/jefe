import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { all, hash } from 'rsvp';

export default Route.extend({
  model(params) {
    const model = {
      versions: [],
      engines: [],
      trimLevels: [],
      gearboxes: [],
      transmissions: [],
    };
    return this.store.peekRecord('phase', params.phase_id).query('versions', {
      include: this.get('includedRelationship'),
      meta: {
        filterable: false,
      },
      page: { size: 500 },
    }).then((versions) => {
      model.versions = versions;
      model.versions.pushObjects(versions);
      model.trimLevels.pushObjects(versions.mapBy('trimLevel').uniq());
      return hash({
        engines: all(model.versions.mapBy('lastEngine')),
        gearbox: all(model.versions.mapBy('gearbox')),
        transmissions: all(model.versions.mapBy('lastTransmission')),
      });
    }).then((filterable) => {
      model.engines.pushObjects(filterable.engines.uniq());
      model.gearboxes.pushObjects(filterable.gearbox.uniq());
      model.transmissions.pushObjects(filterable.transmissions.uniq());
      return model;
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
