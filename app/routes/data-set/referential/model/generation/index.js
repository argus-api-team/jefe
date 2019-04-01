import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    const generation = this.modelFor('data-set.referential.model.generation');
    return generation.get('phases').then((phases) => {
      const sortedPhases = phases.sortBy('startDate');
      const lastPhase = sortedPhases.lastObject;
      this.transitionTo('data-set.referential.model.generation.phase', lastPhase.get('id'));
    });
  },
});
