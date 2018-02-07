import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  sortedSubmodels: computed('model.submodels', function() {
    return this.get('model.submodels').sortBy('name');
  })
});
