import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'jefe/config/environment';
import HasManyQuery from 'ember-data-has-many-query';
import { pluralize } from 'ember-inflector';
import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
// import Ember from 'ember';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, HasManyQuery.RESTAdapterMixin, {
  localizedReferentials: service(),
  notify: service('notify'),

  host: ENV.API_URL,
  namespace: computed('baseUrl', 'localizedReferentials.dataSetPrefix', function () {
    const dataSetPrefix = this.get('localizedReferentials').get('dataSetPrefix');
    return dataSetPrefix ? `${dataSetPrefix}/${this.get('baseUrl')}` : this.get('baseUrl');
  }),
  coalesceFindRequests: true,
  urlForFindMany(ids, modelName) {
    const endpoint = pluralize(modelName);
    return `${this.buildURL()}/${endpoint}/?page[size]=${ids.length}`;
  },
  authorize(xhr) {
    const accessToken = this.get('session.data.authenticated.access_token');
    if (isPresent(accessToken)) {
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    }
  },
  isInvalid(status, headers, payload) {
    const notify = this.get('notify');
    const message = payload.errors[0].detail.message || payload.errors[0].detail;
    notify.alert(message, {
      type: 'danger',
      icon: 'warning',
      title: payload.errors[0].title,
    });
  },

  baseUrl: 'specs/2.0/',
});
