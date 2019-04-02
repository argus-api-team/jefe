import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  userProfile: service(),
  notify: service(),
  intl: service(),

  beforeModel() {
    const matchingScope = this.get('userProfile.matchingScope');
    if (!matchingScope) {
      const intl = this.get('intl');
      this.transitionTo('data-set');
      // Permission notif
      this.get('notify').alert(intl.t('notifications.errors.permissions.reasons.matching'), {
        type: 'warning',
        icon: 'warning',
        title: intl.t('notifications.errors.permissions.title'),
      });
    }
  },
  model() {
    return this.store.query('matching', {
      page: { size: 10 },
      sort: '-id',
    }).catch(() => {
      this.transitionTo('index');
    });
  },
  actions: {
    refreshModel() {
      this.refresh();
    },
  },
});
