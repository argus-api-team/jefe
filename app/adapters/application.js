import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'jefe/config/environment';
import HasManyQuery from 'ember-data-has-many-query';
import { pluralize } from 'ember-inflector';
import { isPresent } from '@ember/utils';
// import Ember from 'ember';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, HasManyQuery.RESTAdapterMixin, {
  host: ENV.API_URL,
  namespace: 'specs/2.0',
  coalesceFindRequests: true,
  urlForFindMany(ids, modelName) {
    const endpoint = pluralize(modelName);
    return `${this.buildURL()}/${endpoint}/?page[size]=${ids.length}`;
  },
  authorize(xhr) {
    const accessToken  = this.get('session.data.authenticated.access_token');
    if (isPresent(accessToken)) {
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    }
  },
});
