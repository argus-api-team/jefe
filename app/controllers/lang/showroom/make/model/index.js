import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.sortDefinition = ['name'];
  },
  sortedModels: computed.sort('model.submodels', 'sortDefinition'),
});
