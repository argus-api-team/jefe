import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
// import Ember from 'ember';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  host: 'https://integration-api.largus.fr',
  namespace: 'specs/2.0',
  coalesceFindRequests: true,

  // Ember adapter pluralize automatically model names (cf. https://guides.emberjs.com/v2.13.0/models/customizing-adapters/#toc_pluralization-customization)
  // pathForType(modelName) {
  //   if (modelName === 'equipment') {
  //     return 'equipments';
  //   } else {
  //     return Ember.String.pluralize(modelName);
  //   }
  // }
});
