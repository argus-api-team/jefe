import Component from '@ember/component';
import { computed } from '@ember/object';
import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default Component.extend({

  store: service(),

  tagName: 'li',
  classNames: ['vertical-list__item'],

  vehicle: computed('valorization', function () {
    const store = this.get('store');
    const valorization = this.get('valorization');
    const versionId = valorization.belongsTo('version').id();
    if (!versionId) { return null; }
    return DS.PromiseObject.create({
      promise: store.findRecord('version', versionId, {
        include: 'make,submodel,generation,phase',
      }).then(version => version)
        .catch(() => null),
    });
  }),
});
