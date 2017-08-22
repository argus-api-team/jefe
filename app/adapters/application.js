import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  host: 'https://api.largus.fr',
  namespace: 'specs/2.0',
  coalesceFindRequests: true,

  pathForType: function(modelName) {
    if (modelName === 'equipment') {
      return 'equipments';
    } else {
      return Ember.String.pluralize(modelName);
    }
  }
});
