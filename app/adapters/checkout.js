import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'jefe/config/environment';
// import Ember from 'ember';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  host: ENV.API_URL,
  namespace: 'checkout/3.0',
  coalesceFindRequests: true,
  authorize(xhr) {
    const accessToken  = this.get('session.data.authenticated.access_token');
    if (isPresent(accessToken)) {
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    }
  },
});
