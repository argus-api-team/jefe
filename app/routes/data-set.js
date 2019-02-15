import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ApplicationAdapter from '../adapters/application';

export default Route.extend(AuthenticatedRouteMixin, {

  model(params) {
    const dataSet = params.data_set;
    const dataSetPrefix = dataSet.replace('-', '/');
    ApplicationAdapter.reopen({
      dataSetPrefix,
    });
    return params;
  },
});
