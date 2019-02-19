import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'index',

  userSettings: service(),

  beforeModel() {
    const userSettings = this.get('userSettings');
    userSettings.destroy();
  },

});
