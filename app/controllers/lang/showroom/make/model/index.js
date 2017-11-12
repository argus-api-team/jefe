import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  sortedModels: computed.sort('model.submodels', 'sortDefinition'),
  sortDefinition: ['name'],
});
