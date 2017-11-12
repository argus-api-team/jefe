import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  sortedModels: computed.sort('model.models', 'sortDefinition'),
  sortDefinition: ['name'],
});
