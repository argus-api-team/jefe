import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  localizedReferentials: service(),
  userSettings: service(),
  userProfile: service(),
  notify: service(),
  intl: service(),

  beforeModel() {
    this.get('userSettings');
  },

  model(params) {
    const intl = this.get('intl');
    const dataSet = params.data_set;
    const localizedReferentials = this.get('localizedReferentials');
    const availablePrefixes = localizedReferentials.get('availablePrefixes');
    const crossCountryScope = this.get('userProfile.crossCountryScope');
    let dataSetPrefix = dataSet.replace('-', '/');
    if (availablePrefixes.indexOf(dataSetPrefix) === -1) {
      dataSetPrefix = 'fr/fr';
      this.transitionTo('data-set', 'fr-fr');
      // Permission notif
      this.get('notify').alert(intl.t('notifications.errors.notFound.text'), {
        type: 'warning',
        icon: 'warning',
        title: intl.t('notifications.errors.notFound.title'),
      });
      return params;
    }
    if (!crossCountryScope && dataSet !== 'fr-fr') {
      dataSetPrefix = 'fr/fr';
      this.transitionTo('data-set', 'fr-fr');
      // Permission notif
      this.get('notify').alert(intl.t('notifications.errors.permissions.reasons.crossCountry'), {
        type: 'warning',
        icon: 'warning',
        title: intl.t('notifications.errors.permissions.title'),
      });
      return params;
    }
    localizedReferentials.set('dataSetPrefix', dataSetPrefix);
    return params;
  },
});
