import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  localizedReferentials: service(),
  userSettings: service(),

  beforeModel() {
    this.get('userSettings');
  },

  model(params) {
    const dataSet = params.data_set;
    const dataSetPrefix = dataSet.replace('-', '/');
    const localizedReferentials = this.get('localizedReferentials');
    const crossCountryScope = this.get('userProfile.crossCountryScope');
    if (!crossCountryScope && dataSet !== 'fr-fr') {
      this.transitionTo('data-set', 'fr-fr');
    }
    localizedReferentials.set('dataSetPrefix', dataSetPrefix);
    return params;
  },
});
