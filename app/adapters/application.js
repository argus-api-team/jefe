import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'jefe/config/environment';
// import Ember from 'ember';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  host: ENV.API_URL,
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
