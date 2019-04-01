import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  userProfile: service(),
  beforeModel() {
    const valorizationScope = this.get('userProfile.valorizationScope');
    if (!valorizationScope) {
      this.transitionTo('data-set');
    }
  },
});
