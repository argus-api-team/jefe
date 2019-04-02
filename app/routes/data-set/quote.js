import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  userProfile: service(),
  notify: service(),
  intl: service(),

  beforeModel() {
    const valorizationScope = this.get('userProfile.valorizationScope');
    if (!valorizationScope) {
      const intl = this.get('intl');
      this.transitionTo('data-set');
      // Permission notif
      this.get('notify').alert(intl.t('notifications.errors.permissions.reasons.quote'), {
        type: 'warning',
        icon: 'warning',
        title: intl.t('notifications.errors.permissions.title'),
      });
    }
  },
});
