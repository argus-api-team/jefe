import EmberRoute from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default EmberRoute.extend(UnauthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('lang', model.lang);
  }
});
