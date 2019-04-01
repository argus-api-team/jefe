import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  userProfile: service(),
  beforeModel() {
    const valorizationScope = this.get('userProfile.valorizationScope');
    if (!valorizationScope) {
      this.transitionTo('data-set');
    }
  },
});
