import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';

export default Route.extend({
  model() {
    return this.store.createRecord('valorization', {
      businessTarget: 'btoc',
    });
  },
  unloadIncompleteValorizeRecord: on('deactivate', function () {
    if (this.currentModel.get('isNew') && !this.currentModel.get('isSaving')) {
      this.currentModel.unloadRecord();
    }
  }),
});
