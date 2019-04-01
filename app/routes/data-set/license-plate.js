import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  userProfile: service(),
  beforeModel() {
    const matchingScope = this.get('userProfile.matchingScope');
    if (!matchingScope) {
      this.transitionTo('data-set');
    }
  },
  model() {
    return this.store.query('matching', {
      page: { size: 10 },
      sort: '-id',
    });
  },
  actions: {
    refreshModel() {
      this.refresh();
    },
  },
});
