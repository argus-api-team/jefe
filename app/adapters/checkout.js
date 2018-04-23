import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
// import Ember from 'ember';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  host: 'https://integration-api.largus.fr',
  namespace: 'checkout/3.0',
  coalesceFindRequests: true,
});
