import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import EmberObject from '@ember/object';
import { all, hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    const model = {
      versions: [],
      trimLevels: [],
      engines: [],
      energies: [],
      gearboxes: [],
      transmissions: [],
    };
    return this.store.peekRecord('phase', params.phase_id).query('versions', {
      include: this.get('includedRelationship').join(','),
      meta: {
        filterable: false,
      },
      page: { size: 500 },
    }).then((versions) => {
      model.versions.pushObjects(versions.toArray());
      model.trimLevels.pushObjects(this._getTrimLevels(versions));
      return hash({
        engines: all(model.versions.mapBy('lastEngine')),
        energies: this._getEnergies(model.versions),
        gearbox: all(model.versions.mapBy('gearbox')),
        transmissions: all(model.versions.mapBy('lastTransmission')),
      });
    }).then((filterable) => {
      model.engines.pushObjects(filterable.engines.uniq().without(null));
      model.energies.pushObjects(filterable.energies.uniq().without(null));
      model.gearboxes.pushObjects(filterable.gearbox.uniq().without(null));
      model.transmissions.pushObjects(filterable.transmissions.uniq().without(null));
      return model;
    })
      .catch(() => {
        // Insert debug code here
      })
      .finally(() => {
        const modelController = this.controllerFor('data-set.referential.model');
        modelController.set('loadingVersions', false);
      });
  },
  actions: {
    loading() {
      // This hook is used to trigger loading template render event
      // To change the loading template see the end of lang/referential/model template
      const modelController = this.controllerFor('data-set.referential.model');
      modelController.set('loadingVersions', true);
      return true;
    },
  },

  renderTemplate(controller, model) {
    this.render('data-set.referential.model.generation.phase', {
      into: 'data-set.referential.model',
      outlet: 'versions',
      model,
    });
  },

  includedRelationship: Object.freeze([
    'periods.engine.energy',
    'periods.transmission',
    'energy',
    'gearbox',
  ]),

  _getTrimLevels(versions) {
    const trimLevels = versions.mapBy('trimLevel').uniq().without(null);
    return trimLevels.map((trimLevel) => EmberObject.create({
      id: trimLevel,
      name: trimLevel,
    }));
  },

  _getEnergies(versions) {
    return all(versions.mapBy('lastEngine'))
      .then((versionEngines) => {
        const engines = versionEngines.without(null).uniq();
        return engines.length ? all(engines.mapBy('energy')) : all(versions.mapBy('energy'));
      })
      .then((engineEnergies) => engineEnergies.uniq());
  },
});
