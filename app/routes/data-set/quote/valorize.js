import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { on } from '@ember/object/evented';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.createRecord('valorization', {
      businessTarget: 'btoc',
      fromCountryOfOrigin: false,
      originCountry: 'FR',
    });
  },
  unloadIncompleteValorizeRecord: on('deactivate', function () {
    if (this.currentModel.get('isNew') && !this.currentModel.get('isSaving')) {
      this.currentModel.unloadRecord();
    }
  }),
});
