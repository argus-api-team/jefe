import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// import ApplicationAdapter from '../adapters/application';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  localizedReferentials: service(),

  model(params) {
    const dataSet = params.data_set;
    const dataSetPrefix = dataSet.replace('-', '/');
    const localizedReferentials = this.get('localizedReferentials');
    localizedReferentials.set('dataSetPrefix', dataSetPrefix);
    return params;
  },
});
